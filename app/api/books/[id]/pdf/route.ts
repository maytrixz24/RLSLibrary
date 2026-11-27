import PDFDocument from "pdfkit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SOURCES: Record<string, { ebookId: number; title: string; author: string }> = {
  "meditations": { ebookId: 2680, title: "Meditations", author: "Marcus Aurelius; translated by George Long" },
  "federalist-papers": { ebookId: 1404, title: "The Federalist Papers", author: "Alexander Hamilton, James Madison and John Jay" },
  "pride-and-prejudice": { ebookId: 1342, title: "Pride and Prejudice", author: "Jane Austen" },
  "jane-eyre": { ebookId: 1260, title: "Jane Eyre", author: "Charlotte Bronte" },
  "origin-of-species": { ebookId: 1228, title: "On the Origin of Species", author: "Charles Darwin" },
  "relativity": { ebookId: 36114, title: "Relativity: The Special and General Theory", author: "Albert Einstein; translated by Robert W. Lawson" },
  "dhammapada": { ebookId: 2017, title: "The Dhammapada", author: "Translated by F. Max Muller" }
};

async function fetchGutenbergText(id: number): Promise<string> {
  const candidates = [
    `https://www.gutenberg.org/cache/epub/${id}/pg${id}.txt`,
    `https://www.gutenberg.org/files/${id}/${id}-0.txt`,
    `https://www.gutenberg.org/files/${id}/${id}.txt`
  ];

  let lastStatus = 0;
  for (const url of candidates) {
    try {
      const response = await fetch(url, {
        headers: { "User-Agent": "RLSlibrary/0.3 (+https://rlslibrary.vercel.app; public-domain reading copy)" },
        signal: AbortSignal.timeout(15000),
        next: { revalidate: 86400 }
      });
      if (response.ok) {
        const text = await response.text();
        if (text.length > 1000) return text;
      }
      lastStatus = response.status;
    } catch {
      // Try the next canonical Project Gutenberg text URL.
    }
  }
  throw new Error(`Project Gutenberg text is temporarily unavailable (last status ${lastStatus}).`);
}

function normalizePdfText(value: string): string {
  return value
    .replace(/\r/g, "")
    .replace(/\f/g, "\n\n")
    .replace(/\u0000/g, "")
    .replace(/[\uF0B7\u2022\u25AA\u25CF\u25E6\u00B7]/g, "-")
    .replace(/[\u2192\u2794]/g, "->")
    .replace(/\u2026/g, "...")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014\u2011]/g, "-")
    .replace(/\u00A0/g, " ")
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .replace(/[\u0001-\u0008\u000B\u000E-\u001F\u007F-\u009F]/g, "")
    .replace(/[^\u0009\u000A\u000D\u0020-\u007E\u00A0-\u00FF]/g, "");
}

function makePdf(source: { title: string; author: string; ebookId: number }, body: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const pdf = new PDFDocument({
      size: "A4",
      margins: { top: 58, right: 58, bottom: 58, left: 58 },
      info: {
        Title: source.title,
        Author: source.author,
        Subject: `Public-domain reading copy from Project Gutenberg eBook ${source.ebookId}`,
        Keywords: "RLSlibrary, Project Gutenberg, public domain"
      },
      compress: true
    });

    const chunks: Buffer[] = [];
    pdf.on("data", (chunk: Buffer) => chunks.push(chunk));
    pdf.once("error", reject);
    pdf.once("end", () => resolve(Buffer.concat(chunks)));

    pdf.rect(0, 0, pdf.page.width, pdf.page.height).fill("#f2ede3");
    pdf.fillColor("#294333").font("Times-Bold").fontSize(25)
      .text(source.title, 64, 190, { width: pdf.page.width - 128, align: "center" });
    pdf.moveDown(1.2);
    pdf.fillColor("#8d7449").font("Times-Italic").fontSize(11)
      .text(source.author, { align: "center" });
    pdf.moveDown(3);
    pdf.fillColor("#5d6259").font("Times-Roman").fontSize(8.5)
      .text(`RLSlibrary reading copy · Project Gutenberg eBook #${source.ebookId}. The source site's header, legal notices and license text are retained in the following text.`, {
        align: "center",
        width: pdf.page.width - 140
      });

    pdf.addPage();
    pdf.fillColor("#1f2420").font("Times-Roman").fontSize(9.5)
      .text(normalizePdfText(body), {
        width: pdf.page.width - 116,
        align: "left",
        lineGap: 2
      });
    pdf.end();
  });
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const source = SOURCES[id];

  if (!source) {
    return Response.json({ error: "Book not found." }, { status: 404 });
  }

  try {
    const text = await fetchGutenbergText(source.ebookId);
    const bytes = await makePdf(source, text);
    const filename = `${id}.pdf`;

    return new Response(new Uint8Array(bytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${filename}"`,
        "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
        "X-Content-Type-Options": "nosniff"
      }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to prepare the PDF.";
    return Response.json({ error: message }, { status: 503 });
  }
}
