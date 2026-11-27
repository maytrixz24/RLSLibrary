import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import booksData from "../../../data/books.json";

type Book = {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  category: string;
  year: number;
  description: string;
  pdfUrl: string;
  sourceUrl: string | null;
  sourceName: string;
  rightsLabel: string;
  rightsNote: string;
  rating: number | null;
  ratingSource: string | null;
  ratingUrl?: string;
};

const books = booksData as Book[];

export default async function ReadBookPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const book = books.find((item) => item.id === id);
  if (!book) notFound();

  return (
    <main className="reader-shell">
      <header className="reader-topbar">
        <Link href="/" className="reader-brand">
          <Image src="/logo.svg" alt="RLSlibrary" width={230} height={45} priority />
        </Link>
        <Link href="/" className="reader-back">← Back to bookshelf</Link>
      </header>

      <section className="reader-heading">
        <div className="reader-category">{book.category}</div>
        <h1>{book.title}</h1>
        <p>{book.subtitle} · {book.author}</p>
        <div className="reader-actions">
          <a className="reader-download" href={book.pdfUrl} target="_blank" rel="noreferrer">Open / Download PDF ↗</a>
          {book.sourceUrl && <a className="reader-source" href={book.sourceUrl} target="_blank" rel="noreferrer">Original source ↗</a>}
        </div>
      </section>

      <section className="pdf-stage" aria-label={`PDF reader for ${book.title}`}>
        <iframe src={book.pdfUrl} title={`PDF reader: ${book.title}`} />
      </section>

      <section className="reader-footnotes">
        <div>
          <strong>Edition and rights</strong>
          <p>{book.rightsLabel}. {book.rightsNote}</p>
          {book.sourceUrl && <p>Source: <a href={book.sourceUrl} target="_blank" rel="noreferrer">{book.sourceName}</a>.</p>}
        </div>
        {book.rating !== null && (
          <div>
            <strong>Reader rating</strong>
            <p>★ {book.rating.toFixed(2)} / 5 · {book.ratingSource ?? "Community rating"} · snapshot 27 Nov 2026</p>
            {book.ratingUrl && <a href={book.ratingUrl} target="_blank" rel="noreferrer">View rating source ↗</a>}
          </div>
        )}
      </section>
    </main>
  );
}
