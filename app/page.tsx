"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  ArrowUpRight, BookOpen, CheckCircle2, ChevronDown, LibraryBig,
  Search, Sparkles, Star
} from "lucide-react";
import booksData from "../data/books.json";

type Book = {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  category: string;
  language: string;
  year: number;
  format: string;
  description: string;
  pdfUrl: string;
  sourceUrl: string | null;
  sourceName: string;
  rightsLabel: string;
  rightsNote: string;
  rating: number | null;
  ratingSource: string | null;
  ratingUrl?: string;
  cover: string;
  tags: string[];
};

const books = booksData as Book[];
const categories = [
  "All Books",
  "Education / Academic",
  "Finance / Economics",
  "Law / Legal Studies",
  "Fiction / Novels",
  "Science / Technology",
  "Religion"
];

const translations = {
  EN: {
    eyebrow: "A LIBRARY FOR CURIOUS MINDS",
    title: "A world between pages.",
    intro: "A thoughtful place to read, learn, and return to the ideas worth keeping.",
    search: "Search titles, subjects, or authors...",
    shelf: "The bookshelf",
    viewAll: "Browse all books",
    open: "Read PDF",
    noResults: "No books match your search. Try another title or category.",
    openLibrary: "OPEN READING",
    free: "FREE TO READ",
    all: "All Books",
    snapshot: "Goodreads reader rating"
  },
  ID: {
    eyebrow: "PERPUSTAKAAN UNTUK PEMBELAJAR",
    title: "Dunia di antara halaman.",
    intro: "Tempat untuk membaca, belajar, dan kembali pada gagasan yang layak disimpan.",
    search: "Cari judul, subjek, atau penulis...",
    shelf: "Rak buku",
    viewAll: "Jelajahi semua buku",
    open: "Baca PDF",
    noResults: "Tidak ada buku yang cocok. Coba judul atau kategori lain.",
    openLibrary: "AKSES TERBUKA",
    free: "GRATIS DIBACA",
    all: "Semua Buku",
    snapshot: "Rating pembaca Goodreads"
  }
};

function BookCover({ book }: { book: Book }) {
  return (
    <div className={`book-cover cover-${book.cover}`} aria-hidden="true">
      <div className="cover-topline"><span>RLSLIBRARY</span><span>✦</span></div>
      <div className="cover-center">
        <BookOpen size={25} strokeWidth={1.25} />
        <strong>{book.title}</strong>
        <span>{book.subtitle}</span>
      </div>
      <div className="cover-bottomline"><span>{book.year}</span><span>READ · LEARN · SMART</span></div>
    </div>
  );
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All Books");
  const [language, setLanguage] = useState<"EN" | "ID">("EN");
  const [showAll, setShowAll] = useState(true);
  const copy = translations[language];

  const counts = useMemo(() => {
    const result: Record<string, number> = {};
    for (const item of categories) {
      result[item] = item === "All Books" ? books.length : books.filter((book) => book.category === item).length;
    }
    return result;
  }, []);

  const filteredBooks = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return books.filter((book) => {
      const matchesCategory = category === "All Books" || book.category === category;
      const searchable = [
        book.title, book.subtitle, book.author, book.description, book.category, ...book.tags
      ].join(" ").toLocaleLowerCase();
      return matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [category, query]);

  const visibleBooks = showAll ? filteredBooks : filteredBooks.slice(0, 6);

  return (
    <main className="shell">
      <aside className="sidebar" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="RLSlibrary home">
          <Image src="/logo.svg" alt="RLSlibrary — Read. Learn. Smart." width={212} height={42} priority />
        </a>

        <div className="side-label">LIBRARY</div>
        <a className="side-link active" href="#top"><LibraryBig size={17} /> Discover</a>
        <a className="side-link" href="#collection"><BookOpen size={17} /> All Books</a>
        <a className="side-link" href="#categories"><Star size={16} /> Categories</a>

        <div className="sidebar-bottom">
          <div className="mini-emblem"><BookOpen size={18} /></div>
          <p>Read a little.<br /><em>Discover a lot.</em></p>
          <span>AN OPEN COLLECTION OF IDEAS & STORIES</span>
        </div>
      </aside>

      <section className="main-area" id="top">
        <header className="topbar">
          <div className="breadcrumb">Library <span>/</span> Discover</div>
          <div className="top-actions">
            <span className="open-label"><CheckCircle2 size={13} /> {copy.openLibrary}</span>
            <button
              className="language"
              onClick={() => setLanguage(language === "EN" ? "ID" : "EN")}
              aria-label="Switch language"
              type="button"
            >
              {language} <ChevronDown size={14} />
            </button>
          </div>
        </header>

        <section className="hero">
          <div className="hero-text">
            <div className="eyebrow"><Sparkles size={13} /> {copy.eyebrow}</div>
            <h1>{copy.title}</h1>
            <p>{copy.intro}</p>
            <label className="searchbox">
              <Search size={18} aria-hidden="true" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={copy.search}
                aria-label={copy.search}
              />
              <kbd>/</kbd>
            </label>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="art-glow" />
            <div className="art-book book-back" />
            <div className="art-book book-front">
              <span>RLS</span><BookOpen size={34} /><small>THE ART OF<br />KNOWLEDGE</small>
            </div>
            <div className="art-spark">✦</div>
          </div>
          <div className="hero-foot">
            <span>EST. 2026</span>
            <span>AN OPEN COLLECTION OF IDEAS & STORIES</span>
          </div>
        </section>

        <section className="section-heading" id="collection">
          <div>
            <div className="section-kicker">THE COLLECTION</div>
            <h2>{copy.shelf}</h2>
            <p>{books.length} books · Six subject sections</p>
          </div>
          <button className="text-button" onClick={() => setShowAll((value) => !value)} type="button">
            {showAll ? "Show featured" : copy.viewAll} <ArrowUpRight size={16} />
          </button>
        </section>

        <section className="category-row" id="categories" aria-label="Filter by category">
          {categories.map((item) => (
            <button
              key={item}
              className={`category-chip ${category === item ? "selected" : ""}`}
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
              type="button"
            >
              {item === "All Books" ? copy.all : item}
              <span>{counts[item]}</span>
            </button>
          ))}
        </section>

        {visibleBooks.length > 0 ? (
          <section className="book-grid" aria-label="Books">
            {visibleBooks.map((book) => (
              <article className="book-card" key={book.id}>
                <a className="cover-link" href={`/read/${book.id}`} aria-label={`Read ${book.title}`}>
                  <BookCover book={book} />
                </a>
                <div className="book-meta">
                  <div className="book-category">{book.category}</div>
                  <h3>{book.title}</h3>
                  <p className="book-subtitle">{book.subtitle}</p>
                  <p className="book-author">{book.author}</p>
                  <p className="book-description">{book.description}</p>

                  <div className="book-tags">
                    {book.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}
                  </div>

                  <div className="book-rating">
                    {book.rating !== null ? (
                      <>
                        <span className="rating-stars" aria-label={`${book.rating} out of 5 stars`}>★</span>
                        <strong>{book.rating.toFixed(2)}</strong>
                        <span>/ 5</span>
                        <a className="rating-caption" href={book.ratingUrl} target="_blank" rel="noreferrer">{book.ratingSource}</a>
                      </>
                    ) : (
                      <span className="original-label">RLSlibrary original</span>
                    )}
                  </div>

                  <div className="book-bottom">
                    <span>{book.format} · {book.year}</span>
                    <a href={`/read/${book.id}`}>{copy.open} <ArrowUpRight size={13} /></a>
                  </div>
                  <div className="book-rights">{book.rightsLabel}</div>
                </div>
              </article>
            ))}
          </section>
        ) : (
          <div className="empty-state">{copy.noResults}</div>
        )}

        <section className="library-note">
          <div><strong>Free reading, with source notes.</strong><p>Goodreads ratings are reader-generated averages, not academic endorsements. Historical books are presented with edition, translation, and rights information.</p></div>
          <div className="note-mark"><BookOpen size={22} /></div>
        </section>

        <footer className="footer">
          <span>© 2026 RLSLIBRARY</span>
          <span>READ. LEARN. SMART.</span>
          <span>KNOWLEDGE IS MEANT TO BE SHARED</span>
        </footer>
      </section>
    </main>
  );
}
