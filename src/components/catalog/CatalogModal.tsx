import React, { useEffect, useRef } from "react";
import { assetUrl, formatSize, type CatalogItem } from "../../catalog";
import { useLanguage } from "../../i18n/useLanguage";

export default function CatalogModal({ item, onClose }: { item: CatalogItem; onClose: () => void }) {
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
