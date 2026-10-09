import React, { useEffect, useMemo, useRef, useState } from "react";
import { assetUrl, formatSize, type CatalogItem, type Lang } from "../catalog";
import { useLanguage } from "../i18n/useLanguage";
import "./Catalog.css";

/** Filter value for "no filter"; the label comes from the translations. */
const ALL = "*";

interface CatalogProps {
  items: CatalogItem[];
}

const matchesQuery = (
  item: CatalogItem,
  query: string,
  lang: Lang,
  term: (name: string) => string
) => {
  if (!query) return true;
  const haystack = [
    item.title[lang],
    item.subtitle[lang],
    term(item.category),
    ...item.subTags.map(term),
    item.description[lang],
  ]
    .join(" ")
    .toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .every((word) => haystack.includes(word));
};

export default function Catalog({ items }: CatalogProps) {
  const { lang, t, term } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState(ALL);
  const [selectedSubTag, setSelectedSubTag] = useState(ALL);
  const [query, setQuery] = useState("");
  const [activeItem, setActiveItem] = useState<CatalogItem | null>(null);

  // ==========================
  // FILTRY
  // ==========================

  const categories = useMemo(
    () => [ALL, ...new Set(items.map((p) => p.category))],
    [items]
  );

  const subTags = useMemo(
    () => [
      ALL,
      ...new Set(
        items
          .filter((p) => selectedCategory === ALL || p.category === selectedCategory)
          .flatMap((p) => p.subTags)
      ),
    ],
    [items, selectedCategory]
  );

  const filtered = useMemo(
    () =>
      items.filter(
        (p) =>
          (selectedCategory === ALL || p.category === selectedCategory) &&
          (selectedSubTag === ALL || p.subTags.includes(selectedSubTag)) &&
          matchesQuery(p, query.trim(), lang, term)
      ),
    [items, selectedCategory, selectedSubTag, query, lang, term]
  );

  return (
    <div>
      <div className="tags-container">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setSelectedSubTag(ALL);
            }}
            className={`tag ${selectedCategory === category ? "active" : ""}`}
          >
            {category === ALL ? t.catalog.all : term(category)}
          </button>
        ))}
      </div>

      <div className="tags-container subtags">
        {subTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedSubTag(tag)}
            className={`tag ${selectedSubTag === tag ? "active" : ""}`}
          >
            {tag === ALL ? t.catalog.all : term(tag)}
          </button>
        ))}
      </div>

      <div className="tags-container">
        <input
          type="search"
          className="catalog-search"
          placeholder={t.catalog.search}
          aria-label={t.catalog.search}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="grid-container">
        {filtered.map((p) => (
          <div key={p.id} className="project-card" onClick={() => setActiveItem(p)}>
            {p.thumbnail ? (
              <img
                src={assetUrl(p.thumbnail)}
                alt={p.title[lang]}
                className="project-image"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div className="project-image project-image--empty" />
            )}

            <div className="project-info">
              <h3>{p.title[lang]}</h3>
              <p>{p.subtitle[lang]}</p>

              <div className="project-tags">
                <span className="project-tag category">{term(p.category)}</span>
                {p.subTags.slice(0, 3).map((tag) => (
                  <span key={tag} className="project-tag">
                    {term(tag)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && <p className="catalog-empty">{t.catalog.noResults}</p>}
      </div>

      {activeItem && <CatalogModal item={activeItem} onClose={() => setActiveItem(null)} />}
    </div>
  );
}

// ==========================
// MODAL
// ==========================

function CatalogModal({ item, onClose }: { item: CatalogItem; onClose: () => void }) {
  const { lang, t, term } = useLanguage();
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDown.current = true;
    startX.current = e.pageX;
    scrollLeft.current = galleryRef.current?.scrollLeft ?? 0;
  };

  const onMouseUp = () => {
    isDown.current = false;
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDown.current || !galleryRef.current) return;
    e.preventDefault();
    const walk = (e.pageX - startX.current) * 1.5;
    galleryRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose} aria-label={t.catalog.close}>
          ×
        </button>

        <h2>{item.title[lang]}</h2>
        <p>{item.subtitle[lang]}</p>

        {item.images.length > 0 && (
          <div
            className="modal-gallery"
            ref={galleryRef}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
          >
            {item.images.map((img, i) => (
              <div className="gallery-slide" key={img}>
                <img src={assetUrl(img)} alt={`${item.title[lang]} ${i + 1}`} decoding="async" />
              </div>
            ))}
          </div>
        )}

        {item.description[lang] && <p>{item.description[lang]}</p>}

        <div className="modal-actions">
          {item.files.length > 0 ? (
            item.files.map((file) => (
              <a key={file.path} className="download-btn" href={assetUrl(file.path)} download={file.name}>
                {t.catalog.download(file.ext)} · {formatSize(file.size)}
              </a>
            ))
          ) : (
            <span className="download-btn download-btn--disabled">{t.catalog.comingSoon}</span>
          )}
        </div>

        <div className="project-tags">
          <span className="project-tag category">{term(item.category)}</span>
          {item.subTags.map((tag) => (
            <span key={tag} className="project-tag">
              {term(tag)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
