import { useId, useMemo, useRef, type CSSProperties, type PointerEvent, type ReactNode } from "react";
import type { CatalogItem } from "../../catalog";
import { useLanguage } from "../../i18n/useLanguage";
import type { CatalogView } from "./CatalogResults";
import { AllIcon, ListIcon, SearchIcon, TermIcon, ThumbnailsIcon } from "./icons";
import { buildRibbon, ribbonKey, type Selection } from "./search";

interface CatalogRibbonProps {
  title: string;
  /** Every item in the section — defines the tabs and buttons. */
  items: CatalogItem[];
  /** Items matching the search — buttons without matches are greyed out. */
  matching: CatalogItem[];
  selection: Selection;
  onSelect: (selection: Selection) => void;
  query: string;
  onQueryChange: (query: string) => void;
  view: CatalogView;
  onViewChange: (view: CatalogView) => void;
  minimized: boolean;
  onMinimizedChange: (minimized: boolean) => void;
}

/*
 * Refraction needs an SVG filter inside backdrop-filter, which only Chromium renders.
 * Other browsers would drop the whole declaration, so they keep the plain frosted blur.
 */
const supportsRefraction = typeof navigator !== "undefined" && /\bChrome\//.test(navigator.userAgent);

/** Distorts what is behind the glass, like light bending through a lens. */
function LiquidGlassFilter({ id }: { id: string }) {
  return (
    <svg className="liquid-glass-filter" aria-hidden="true" focusable="false">
      <filter id={id} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.006 0.011" numOctaves="2" seed="11" result="noise" />
        <feGaussianBlur in="noise" stdDeviation="2.5" result="smooth" />
        <feDisplacementMap in="SourceGraphic" in2="smooth" scale="42" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  );
}

/** Filters laid out like Revit's ribbon: tabs → panels (categories) → large buttons (sub-categories). */
export default function CatalogRibbon({
  title,
  items,
  matching,
  selection,
  onSelect,
  query,
  onQueryChange,
  view,
  onViewChange,
  minimized,
  onMinimizedChange,
}: CatalogRibbonProps) {
  const { t, term } = useLanguage();
  const tabs = useMemo(() => buildRibbon(items), [items]);
  const filterId = `liquid-glass${useId().replace(/:/g, "")}`;
  const ribbonRef = useRef<HTMLDivElement | null>(null);

  // The specular highlight follows the pointer (CSS variables, no re-render).
  const moveHighlight = (e: PointerEvent<HTMLDivElement>) => {
    const el = ribbonRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--glass-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--glass-y", `${e.clientY - rect.top}px`);
  };

  const available = useMemo(() => {
    const keys = new Set<string>();
    for (const item of matching) {
      keys.add(ribbonKey(item.tab));
      keys.add(ribbonKey(item.tab, item.panel));
      for (const sub of item.subTags) keys.add(ribbonKey(item.tab, item.panel, sub));
    }
    return keys;
  }, [matching]);

  const activeTab = tabs.find((tab) => tab.tab === selection.tab);

  return (
    <div
      ref={ribbonRef}
      className={["ribbon", minimized && "ribbon--minimized", supportsRefraction && "ribbon--refract"]
        .filter(Boolean)
        .join(" ")}
      style={supportsRefraction ? ({ "--glass-filter": `url(#${filterId})` } as CSSProperties) : undefined}
      onPointerMove={moveHighlight}
    >
      {supportsRefraction && <LiquidGlassFilter id={filterId} />}
      <div className="ribbon__tabs" role="tablist">
        <span className="ribbon__app">{title}</span>

        <button
          type="button"
          role="tab"
          aria-selected={!selection.tab}
          className={`ribbon__tab ${!selection.tab ? "ribbon__tab--active" : ""}`}
          onClick={() => onSelect({})}
        >
          {t.catalog.all}
        </button>

        {tabs.map(({ tab }) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={selection.tab === tab}
            className={[
              "ribbon__tab",
              selection.tab === tab && "ribbon__tab--active",
              !available.has(ribbonKey(tab)) && "ribbon__tab--empty",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={() => onSelect({ tab })}
          >
            {term(tab)}
          </button>
        ))}

        <button
          type="button"
          className="ribbon__minimize"
          aria-label={minimized ? t.catalog.expandRibbon : t.catalog.minimizeRibbon}
          title={minimized ? t.catalog.expandRibbon : t.catalog.minimizeRibbon}
          aria-expanded={!minimized}
          onClick={() => onMinimizedChange(!minimized)}
        >
          <svg viewBox="0 0 10 10" width="10" height="10" aria-hidden="true">
            <path d={minimized ? "M1.5 3.5 5 7l3.5-3.5" : "M1.5 6.5 5 3l3.5 3.5"} fill="none" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </button>
      </div>

      {!minimized && (
        <div className="ribbon__body" role="tabpanel">
          {activeTab ? (
            activeTab.panels.map(({ panel, subTags }) => {
              const panelActive = selection.panel === panel && !selection.subTag;
              return (
                <RibbonPanel
                  key={panel}
                  title={term(panel)}
                  // In a tab with several panels the title filters the whole panel.
                  onTitleClick={
                    activeTab.panels.length > 1
                      ? () => onSelect(panelActive ? { tab: activeTab.tab } : { tab: activeTab.tab, panel })
                      : undefined
                  }
                  titleActive={panelActive}
                >
                  {subTags.map((subTag) => {
                    const active = selection.panel === panel && selection.subTag === subTag;
                    return (
                      <LargeButton
                        key={subTag}
                        icon={<TermIcon name={subTag} />}
                        label={term(subTag)}
                        active={active}
                        disabled={!available.has(ribbonKey(activeTab.tab, panel, subTag))}
                        // Clicking the active button again clears the filter.
                        onClick={() => onSelect(active ? { tab: activeTab.tab } : { tab: activeTab.tab, panel, subTag })}
                      />
                    );
                  })}
                </RibbonPanel>
              );
            })
          ) : (
            <RibbonPanel title={t.catalog.ribbonCategories}>
              <LargeButton icon={<AllIcon />} label={t.catalog.all} active onClick={() => onSelect({})} />
              {tabs.map(({ tab }) => (
                <LargeButton
                  key={tab}
                  icon={<TermIcon name={tab} />}
                  label={term(tab)}
                  disabled={!available.has(ribbonKey(tab))}
                  onClick={() => onSelect({ tab })}
                />
              ))}
            </RibbonPanel>
          )}

          <RibbonPanel title={t.catalog.ribbonSearch} className="ribbon-panel--search">
            <div className="ribbon-search">
              <SearchIcon />
              <input
                type="search"
                placeholder={t.catalog.search}
                aria-label={t.catalog.search}
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                onKeyDown={(e) => e.key === "Escape" && onQueryChange("")}
              />
              {query && (
                <button
                  type="button"
                  className="ribbon-search__clear"
                  aria-label={t.catalog.clearSearch}
                  onClick={() => onQueryChange("")}
                >
                  ×
                </button>
              )}
            </div>
          </RibbonPanel>

          <RibbonPanel title={t.catalog.ribbonView}>
            <div className="ribbon-stack">
              <SmallButton
                icon={<ThumbnailsIcon />}
                label={t.catalog.viewThumbnails}
                active={view === "thumbnails"}
                onClick={() => onViewChange("thumbnails")}
              />
              <SmallButton
                icon={<ListIcon />}
                label={t.catalog.viewList}
                active={view === "list"}
                onClick={() => onViewChange("list")}
              />
            </div>
          </RibbonPanel>
        </div>
      )}
    </div>
  );
}

interface RibbonPanelProps {
  title: string;
  className?: string;
  onTitleClick?: () => void;
  titleActive?: boolean;
  children: ReactNode;
}

function RibbonPanel({ title, className = "", onTitleClick, titleActive, children }: RibbonPanelProps) {
  return (
    <section className={`ribbon-panel ${className}`}>
      <div className="ribbon-panel__content">{children}</div>
      {onTitleClick ? (
        <button
          type="button"
          className={`ribbon-panel__title ribbon-panel__title--button ${titleActive ? "ribbon-panel__title--active" : ""}`}
          aria-pressed={titleActive}
          onClick={onTitleClick}
        >
          {title}
        </button>
      ) : (
        <h4 className="ribbon-panel__title">{title}</h4>
      )}
    </section>
  );
}

interface ButtonProps {
  icon: ReactNode;
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

function LargeButton({ icon, label, active, disabled, onClick }: ButtonProps) {
  return (
    <button
      type="button"
      className={`ribbon-btn ribbon-btn--large ${active ? "ribbon-btn--active" : ""}`}
      aria-pressed={active}
      disabled={disabled}
      onClick={onClick}
    >
      <span className="ribbon-btn__icon">{icon}</span>
      <span className="ribbon-btn__label">{label}</span>
    </button>
  );
}

function SmallButton({ icon, label, active, onClick }: ButtonProps) {
  return (
    <button
      type="button"
      className={`ribbon-btn ribbon-btn--small ${active ? "ribbon-btn--active" : ""}`}
      aria-pressed={active}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
