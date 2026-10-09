import { assetUrl, type CatalogItem } from "../../catalog";
import { useLanguage } from "../../i18n/useLanguage";
import { highlightParts, type Selection } from "./search";

export type CatalogView = "thumbnails" | "list";

interface CatalogResultsProps {
  items: CatalogItem[];
  selection: Selection;
  onSelect: (selection: Selection) => void;
  onOpenItem: (item: CatalogItem) => void;
  words: string[];
  view: CatalogView;
  onClearFilters: () => void;
}

export default function CatalogResults({
  items,
  selection,
  onSelect,
  onOpenItem,
  words,
  view,
  onClearFilters,
}: CatalogResultsProps) {
  const { lang, t, term } = useLanguage();

  const highlight = (text: string) =>
    highlightParts(text, words).map((part, i) =>
      part.match ? <mark key={i}>{part.text}</mark> : <span key={i}>{part.text}</span>
    );

  return (
    <div className="catalog-results">
      <div className="catalog-toolbar">
        <nav className="catalog-breadcrumb" aria-label="breadcrumb">
          <button type="button" onClick={() => onSelect({})}>
            {t.catalog.all}
          </button>
          {selection.tab && (
            <>
              <span aria-hidden="true">›</span>
              <button type="button" onClick={() => onSelect({ tab: selection.tab })}>
                {term(selection.tab)}
              </button>
            </>
          )}
          {selection.panel && selection.panel !== selection.tab && (
            <>
              <span aria-hidden="true">›</span>
              <button type="button" onClick={() => onSelect({ tab: selection.tab, panel: selection.panel })}>
                {term(selection.panel)}
              </button>
            </>
          )}
          {selection.subTag && (
            <>
              <span aria-hidden="true">›</span>
              <button type="button" onClick={() => onSelect(selection)}>
                {term(selection.subTag)}
              </button>
            </>
          )}
        </nav>

        <span className="catalog-count">{t.catalog.items(items.length)}</span>

      </div>

      {items.length === 0 ? (
        <div className="catalog-empty">
          <p>{t.catalog.noResults}</p>
          <button type="button" className="tag" onClick={onClearFilters}>
            {t.catalog.clearFilters}
          </button>
        </div>
      ) : view === "thumbnails" ? (
        <div className="grid-container">
          {items.map((p) => (
            <div key={p.id} className="project-card" onClick={() => onOpenItem(p)}>
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
                <h3>{highlight(p.title[lang])}</h3>
                <p>{highlight(p.subtitle[lang])}</p>

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
        </div>
      ) : (
        <div className="catalog-table-wrap">
          <table className="catalog-table">
            <thead>
              <tr>
                <th aria-hidden="true" />
                <th>{t.catalog.columns.name}</th>
                <th>{t.catalog.columns.category}</th>
                <th>{t.catalog.columns.subTag}</th>
                <th>{t.catalog.columns.files}</th>
              </tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr key={p.id} onClick={() => onOpenItem(p)}>
                  <td className="catalog-table__thumb">
                    {p.thumbnail ? (
                      <img src={assetUrl(p.thumbnail)} alt="" loading="lazy" decoding="async" />
                    ) : (
                      <span className="project-image--empty" />
                    )}
                  </td>
                  <td>
                    <button type="button" className="catalog-table__name"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenItem(p);
                      }}
                    >
                      {highlight(p.title[lang])}
                    </button>
                    <span className="catalog-table__subtitle">{highlight(p.subtitle[lang])}</span>
                  </td>
                  <td>{term(p.category)}</td>
                  <td>{p.subTags.map(term).join(", ")}</td>
                  <td>
                    {p.files.length
                      ? p.files.map((f) => (
                          <span key={f.path} className="project-tag">
                            .{f.ext}
                          </span>
                        ))
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
