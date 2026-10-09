import { useCallback, useMemo, useState } from "react";
import type { CatalogItem } from "../../catalog";
import { useLanguage } from "../../i18n/useLanguage";
import CatalogModal from "./CatalogModal";
import CatalogResults, { type CatalogView } from "./CatalogResults";
import CatalogRibbon from "./CatalogRibbon";
import { inSelection, matchesQuery, queryWords, type Selection } from "./search";
import "./Catalog.css";

const VIEW_KEY = "paas-catalog-view";

function readView(): CatalogView {
  try {
    return localStorage.getItem(VIEW_KEY) === "list" ? "list" : "thumbnails";
  } catch {
    return "thumbnails";
  }
}

interface CatalogProps {
  items: CatalogItem[];
  /** Ribbon title, e.g. "Library Browser". */
  title: string;
}

export default function Catalog({ items, title }: CatalogProps) {
  const { lang, term } = useLanguage();
  const [query, setQuery] = useState("");
  const [selection, setSelection] = useState<Selection>({});
  const [view, setView] = useState<CatalogView>(readView);
  const [ribbonMinimized, setRibbonMinimized] = useState(false);
  const [activeItem, setActiveItem] = useState<CatalogItem | null>(null);

  const words = useMemo(() => queryWords(query), [query]);
  const matching = useMemo(
    () => items.filter((item) => matchesQuery(item, words, lang, term)),
    [items, words, lang, term]
  );
  const results = useMemo(() => matching.filter((item) => inSelection(item, selection)), [matching, selection]);

  const changeView = (next: CatalogView) => {
    setView(next);
    try {
      localStorage.setItem(VIEW_KEY, next);
    } catch {
      // ignore
    }
  };

  const closeModal = useCallback(() => setActiveItem(null), []);

  return (
    <div className="catalog">
      <CatalogRibbon
        title={title}
        items={items}
        matching={matching}
        selection={selection}
        onSelect={setSelection}
        query={query}
        onQueryChange={setQuery}
        view={view}
        onViewChange={changeView}
        minimized={ribbonMinimized}
        onMinimizedChange={setRibbonMinimized}
      />

      <CatalogResults
        items={results}
        selection={selection}
        onSelect={setSelection}
        onOpenItem={setActiveItem}
        words={words}
        view={view}
        onClearFilters={() => {
          setQuery("");
          setSelection({});
        }}
      />

      {activeItem && <CatalogModal item={activeItem} onClose={closeModal} />}
    </div>
  );
}
