import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { gunzipSync, inflateRawSync } from "node:zlib";
import PDFDocument from "pdfkit";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const seedDir = path.join(root, "seed-assets");
const outputDir = path.join(root, "public", "library");

const seedBooks = [
  {
    prefix: "nz-law-",
    filename: "Foundations_of_Aotearoa_New_Zealand_Law_2026.pdf",
    title: "Foundations of Aotearoa New Zealand Law 2026",
    subtitle: "A Beginner's Textbook · RLSlibrary reading copy",
    note: "Reflowed from the owner-supplied PDF. Text was extracted and repaginated; original page design, figures and complex layouts may differ."
  },
  {
    prefix: "usdjpy-",
    filename: "Become_a_Pro_Trader_in_USDJPY.pdf",
    title: "Become a Pro Trader in USDJPY",
    subtitle: "RLSlibrary reading copy",
    note: "Reflowed from the owner-supplied PDF. Text was extracted and repaginated; original page design, figures and complex layouts may differ."
  }
];

function readSeedText(prefix) {
  if (!fs.existsSync(seedDir)) {
    throw new Error("Missing seed-assets directory.");
  }
  const parts = fs.readdirSync(seedDir)
    .filter((name) => name.startsWith(prefix) && name.endsWith(".b64"))
    .sort();

  if (parts.length === 0) {
    throw new Error(`No encoded seed parts found for ${prefix}`);
  }

  const encoded = parts.map((name) => fs.readFileSync(path.join(seedDir, name), "utf8").trim()).join("");
  const compressed = Buffer.from(encoded, "base64");
  try {
    return gunzipSync(compressed).toString("utf8");
  } catch (error) {
    // Some seed chunks may carry a damaged gzip trailer even when the
    // compressed DEFLATE payload is intact. In that narrow case, decode
    // the payload without validating the trailer checksum.
    if (error?.code !== "Z_DATA_ERROR" || !String(error.message).includes("incorrect data check")) {
      throw error;
    }

    let offset = 10;
    const flags = compressed[3];
    if (flags & 0x04) {
      offset += 2 + compressed.readUInt16LE(offset);
    }
    if (flags & 0x08) {
      while (offset < compressed.length && compressed[offset] !== 0) offset += 1;
      offset += 1;
    }
    if (flags & 0x10) {
      while (offset < compressed.length && compressed[offset] !== 0) offset += 1;
      offset += 1;
    }
    if (flags & 0x02) offset += 2;

    const payload = compressed.subarray(offset, Math.max(offset, compressed.length - 8));
    const recovered = inflateRawSync(payload);
    console.warn(`Recovered ${prefix} after a gzip trailer checksum mismatch.`);
    return recovered.toString("utf8");
  }
}

function normalizeText(value) {
  return value
    .replace(/\r/g, "")
    .replace(/\f/g, "\n\n")
    .replace(/\u0000/g, "")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\u00A0/g, " ");
}

async function writePdf(book, body) {
  const outputPath = path.join(outputDir, book.filename);
  const doc = new PDFDocument({
    size: "A4",
    margins: { top: 62, right: 58, bottom: 58, left: 58 },
    info: {
      Title: book.title,
      Author: "RLSlibrary Collection",
      Subject: book.subtitle,
      Keywords: "RLSlibrary, public reading library"
    },
    compress: true
  });

  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  doc.rect(0, 0, doc.page.width, doc.page.height).fill("#f2ede3");
  doc.fillColor("#294333").font("Times-Bold").fontSize(23)
    .text(book.title, 64, 190, { width: doc.page.width - 128, align: "center" });
  doc.moveDown(1.2);
  doc.fillColor("#8d7449").font("Times-Italic").fontSize(11)
    .text(book.subtitle, { align: "center" });
  doc.moveDown(4);
  doc.fillColor("#5d6259").font("Times-Roman").fontSize(8.5)
    .text(book.note, { align: "center", width: doc.page.width - 140 });
  doc.moveDown(2);
  doc.fillColor("#9a8b6b").font("Times-Roman").fontSize(8)
    .text("READ. LEARN. SMART.", { align: "center", characterSpacing: 1.3 });

  doc.addPage();
  doc.fillColor("#1f2420").font("Times-Roman").fontSize(9.6)
    .text(body, {
      width: doc.page.width - 116,
      align: "left",
      lineGap: 2.2,
      paragraphGap: 3
    });

  doc.end();
  await new Promise((resolve, reject) => {
    stream.once("finish", resolve);
    stream.once("error", reject);
    doc.once("error", reject);
  });
  return outputPath;
}

fs.mkdirSync(outputDir, { recursive: true });

for (const book of seedBooks) {
  const text = normalizeText(readSeedText(book.prefix));
  const outputPath = await writePdf(book, text);
  console.log(`Generated ${path.relative(root, outputPath)} (${fs.statSync(outputPath).size} bytes)`);
}
