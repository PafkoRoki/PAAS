import React, { useEffect, useMemo, useRef, useState } from "react";
import { assetUrl, formatSize, type CatalogItem } from "../catalog";
import "./Catalog.css";

const ALL = "Wszystkie";

interface CatalogProps {
  items: CatalogItem[];
}

const matchesQuery = (item: CatalogItem, query: string) => {
  if (!query) return true;
  const haystack = [item.title, item.subtitle, item.category, ...item.subTags, item.description]
    .join(" ")
    .toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .every((word) => haystack.includes(word));
};

export default function Catalog({ items }: CatalogProps) {
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
          matchesQuery(p, query.trim())
      ),
    [items, selectedCategory, selectedSubTag, query]
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
            {category}
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
            {tag}
          </button>
        ))}
      </div>

      <div className="tags-container">
        <input
          type="search"
          className="catalog-search"
          placeholder="Szukaj…"
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
                alt={p.title}
                className="project-image"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div className="project-image project-image--empty" />
            )}

            <div className="project-info">
              <h3>{p.title}</h3>
              <p>{p.subtitle}</p>

              <div className="project-tags">
                <span className="project-tag category">{p.category}</span>
                {p.subTags.slice(0, 3).map((t) => (
                  <span key={t} className="project-tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && <p className="catalog-empty">Brak wyników.</p>}
      </div>

      {activeItem && <CatalogModal item={activeItem} onClose={() => setActiveItem(null)} />}
    </div>
  );
}

// ==========================
// MODAL
// ==========================

function CatalogModal({ item, onClose }: { item: CatalogItem; onClose: () => void }) {
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
        <button className="close-btn" onClick={onClose} aria-label="Zamknij">
          ×
        </button>

        <h2>{item.title}</h2>
        <p>{item.subtitle}</p>

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
                <img src={assetUrl(img)} alt={`${item.title} ${i + 1}`} decoding="async" />
              </div>
            ))}
          </div>
        )}

        {item.description && <p>{item.description}</p>}

        <div className="modal-actions">
          {item.files.length > 0 ? (
            item.files.map((file) => (
              <a key={file.path} className="download-btn" href={assetUrl(file.path)} download={file.name}>
                POBIERZ PLIK .{file.ext} · {formatSize(file.size)}
              </a>
            ))
          ) : (
            <span className="download-btn download-btn--disabled">PLIK WKRÓTCE</span>
          )}
        </div>

        <div className="project-tags">
          <span className="project-tag category">{item.category}</span>
          {item.subTags.map((tag) => (
            <span key={tag} className="project-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
