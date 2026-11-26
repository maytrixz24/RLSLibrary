"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Bookmark, BookOpen, CheckCircle2, ChevronDown, Clock3, LibraryBig, Search, Sparkles } from "lucide-react";
import booksData from "../data/books.json";

type Book = {
  id: string; title: string; subtitle: string; author: string; category: string;
  language: string; year: number; format: string; description: string;
  file: string | null; fileName: string; cover: "law" | "fx";
};

const books = booksData as Book[];
const categories = ["All Books", "Education / Academic", "Finance / Economics", "Law & Legal Studies", "Fiction / Novels", "Science / Technology", "Religion"];

function Cover({ kind }: { kind: Book["cover"] }) {
  const isLaw = kind === "law";
  return (
    <div className={`cover ${isLaw ? "cover-law" : "cover-fx"}`} aria-hidden="true">
      <div className="cover-mark"><BookOpen size={27} strokeWidth={1.3} /></div>
      <div className="cover-kicker">RLSLIBRARY · FIELD EDITION</div>
      <div className="cover-title">{isLaw ? "FOUNDATIONS OF AOTEAROA NEW ZEALAND LAW" : "BECOME A PRO TRADER IN USDJPY"}</div>
      <div className="cover-rule" />
      <div className="cover-sub">{isLaw ? "A BEGINNER'S TEXTBOOK" : "A RESEARCH-LED FIELD GUIDE"}</div>
      <div className="cover-edition">FIRST EDITION · 2026</div>
    </div>
  );
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All Books");
  const [language, setLanguage] = useState<"EN" | "ID">("EN");
  const [showAll, setShowAll] = useState(false);

  const copy = language === "EN" ? {
    eyebrow: "A LIBRARY FOR CURIOUS MINDS", title: "A world between pages.",
    intro: "A thoughtful place to read, learn, and return to the ideas worth keeping.",
    search: "Search titles, subjects, or authors...", shelf: "The bookshelf",
    count: "books in the collection", browse: "Browse all books", open: "Read book",
    preparing: "Preparing book file", empty: "No books match your search. Try another title or category.",
    public: "OPEN READING",
  } : {
    eyebrow: "PERPUSTAKAAN UNTUK PEMBELAJAR", title: "Dunia di antara halaman.",
    intro: "Tempat untuk membaca, belajar, dan kembali pada gagasan yang layak disimpan.",
    search: "Cari judul, subjek, atau penulis...", shelf: "Rak buku",
    count: "buku dalam koleksi", browse: "Jelajahi semua buku", open: "Baca buku",
    preparing: "Menyiapkan berkas buku", empty: "Tidak ada buku yang cocok. Coba judul atau kategori lain.",
    public: "BACA GRATIS",
  };

  const filteredBooks = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return books.filter((book) => {
      const matchesCategory = category === "All Books" || book.category === category;
      const searchable = [book.title, book.subtitle, book.author, book.description, book.category].join(" ").toLocaleLowerCase();
      return matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [category, query]);

  const visibleBooks = showAll ? filteredBooks : filteredBooks.slice(0, 4);

  return (
    <main className="shell">
      <aside className="sidebar" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="RLSlibrary home">
          <span className="brand-icon"><BookOpen size={22} strokeWidth={1.6} /></span>
          <span><strong>RLS<span>library</span></strong><small>READ. LEARN. SMART.</small></span>
        </a>
        <div className="side-label">LIBRARY</div>
        <a className="side-link active" href="#top"><LibraryBig size={17} /> Discover</a>
        <a className="side-link" href="#collection"><BookOpen size={17} /> All Books</a>
        <a className="side-link" href="#categories"><Bookmark size={17} /> Categories</a>
        <div className="side-label side-label-spaced">YOUR SPACE</div>
        <a className="side-link side-link-muted" href="#collection"><Clock3 size={17} /> Reading history</a>
        <div className="sidebar-bottom">
          <div className="mini-emblem"><BookOpen size={18} /></div>
          <p>Read a little.<br /><em>Discover a lot.</em></p>
          <span>AN OPEN LIBRARY · EST. 2026</span>
        </div>
      </aside>

      <section className="main-area" id="top">
        <header className="topbar">
          <div className="breadcrumb">Library <span>/</span> Discover</div>
          <div className="top-actions">
            <span className="open-label"><CheckCircle2 size={13} /> {copy.public}</span>
            <button className="language" onClick={() => setLanguage(language === "EN" ? "ID" : "EN")} aria-label="Switch language" type="button">
              {language} <ChevronDown size={14} />
            </button>
            <div className="avatar" aria-label="RLSlibrary">R</div>
          </div>
        </header>

        <section className="hero">
          <div className="hero-text">
            <div className="eyebrow"><Sparkles size={13} /> {copy.eyebrow}</div>
            <h1>{copy.title}</h1>
            <p>{copy.intro}</p>
            <label className="searchbox">
              <Search size={18} aria-hidden="true" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={copy.search} aria-label={copy.search} />
              <kbd>/</kbd>
            </label>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="art-glow" /><div className="art-book book-back" />
            <div className="art-book book-front"><span>RLS</span><BookOpen size={34} /><small>THE ART OF<br />KNOWLEDGE</small></div>
            <div className="art-spark">✦</div>
          </div>
          <div className="hero-foot"><span>EST. 2026</span><span>AN OPEN COLLECTION OF IDEAS & STORIES</span></div>
        </section>

        <section className="section-heading" id="collection">
          <div><div className="section-kicker">THE COLLECTION</div><h2>{copy.shelf}</h2><p>{books.length} {copy.count}</p></div>
          <button className="text-button" onClick={() => setShowAll((value) => !value)} type="button">
            {showAll ? "Show less" : copy.browse} <ArrowUpRight size={16} />
          </button>
        </section>

        <section className="category-row" id="categories" aria-label="Filter by category">
          {categories.map((item) => (
            <button key={item} className={`category-chip ${category === item ? "selected" : ""}`}
              onClick={() => setCategory(item)} aria-pressed={category === item} type="button">{item}</button>
          ))}
        </section>

        {visibleBooks.length > 0 ? (
          <section className="book-grid" aria-label="Books">
            {visibleBooks.map((book) => (
              <article className="book-card" key={book.id}>
                <div className="cover-link"><Cover kind={book.cover} /></div>
                <div className="book-meta">
                  <div className="book-category">{book.category}</div>
                  <h3>{book.title}</h3><p>{book.subtitle}</p>
                  <p className="book-description">{book.description}</p>
                  <div className="book-bottom">
                    <span>{book.format} · {book.year}</span>
                    {book.file ? <a href={book.file} target="_blank" rel="noreferrer">{copy.open} <ArrowUpRight size={13} /></a>
                      : <span className="file-pending">{copy.preparing}</span>}
                  </div>
                </div>
              </article>
            ))}
          </section>
        ) : <div className="empty-state">{copy.empty}</div>}

        <footer className="footer"><span>© 2026 RLSLIBRARY</span><span>READ. LEARN. SMART.</span><span>KNOWLEDGE IS MEANT TO BE SHARED</span></footer>
      </section>
    </main>
  );
}
