import type { CatalogItem, Lang } from "../../catalog";

/** Lower-case and strip Polish diacritics so "sciana" finds "Ściana". */
export const normalize = (text: string) =>
  text
    .toLowerCase()
    .replace(/ł/g, "l")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

export const queryWords = (query: string) => normalize(query).split(/\s+/).filter(Boolean);

export function matchesQuery(
  item: CatalogItem,
  words: string[],
  lang: Lang,
  term: (name: string) => string
) {
  if (!words.length) return true;
  const haystack = normalize(
    [
      item.title[lang],
      item.subtitle[lang],
      term(item.category),
      ...item.subTags.map(term),
      item.description[lang],
      ...item.files.map((f) => f.name),
    ].join(" ")
  );
  return words.every((word) => haystack.includes(word));
}

/** Splits `text` into plain and matched parts for highlighting. */
export function highlightParts(text: string, words: string[]) {
  if (!words.length) return [{ text, match: false }];
  const norm = normalize(text);
  // normalize() keeps string length 1:1 for Latin text, so indexes map back to `text`.
  const marks = new Array<boolean>(text.length).fill(false);
  for (const word of words) {
    let i = norm.indexOf(word);
    while (i !== -1) {
      marks.fill(true, i, i + word.length);
      i = norm.indexOf(word, i + word.length);
    }
  }
  const parts: { text: string; match: boolean }[] = [];
  for (let i = 0; i < text.length; i++) {
    const last = parts[parts.length - 1];
    if (last && last.match === marks[i]) last.text += text[i];
    else parts.push({ text: text[i], match: marks[i] });
  }
  return parts;
}

// ==========================
// WSTĄŻKA: zakładka → panel → podkategoria
// ==========================

export interface Selection {
  tab?: string;
  panel?: string;
  subTag?: string;
}

export interface PanelNode {
  panel: string;
  subTags: string[];
}

export interface TabNode {
  tab: string;
  panels: PanelNode[];
}

/** Groups items into ribbon tabs and panels, keeping the incoming order. */
export function buildRibbon(items: CatalogItem[]): TabNode[] {
  const tabs = new Map<string, TabNode>();
  for (const item of items) {
    let tab = tabs.get(item.tab);
    if (!tab) {
      tab = { tab: item.tab, panels: [] };
      tabs.set(item.tab, tab);
    }
    let panel = tab.panels.find((p) => p.panel === item.panel);
    if (!panel) {
      panel = { panel: item.panel, subTags: [] };
      tab.panels.push(panel);
    }
    for (const subTag of item.subTags) if (!panel.subTags.includes(subTag)) panel.subTags.push(subTag);
  }
  return [...tabs.values()];
}

/** Keys for "does anything match here?" checks: tab, tab/panel, tab/panel/subTag. */
export const ribbonKey = (...parts: string[]) => parts.join("/");

export const inSelection = (item: CatalogItem, sel: Selection) =>
  (!sel.tab || item.tab === sel.tab) &&
  (!sel.panel || item.panel === sel.panel) &&
  (!sel.subTag || item.subTags.includes(sel.subTag));
