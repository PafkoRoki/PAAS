export const LANGUAGES = ['pl', 'en'] as const;
export type Lang = (typeof LANGUAGES)[number];

/** Polish text, optionally with an English translation. A plain string is treated as Polish. */
export type LocalizedInput = string | { pl: string; en?: string };
/** Text in every language; missing translations fall back to Polish at build time. */
export type LocalizedText = Record<Lang, string>;

/** Shape of `meta.json` inside every catalogue item folder. */
export interface CatalogMeta {
  title: LocalizedInput;
  subtitle?: LocalizedInput;
  /** Polish name; translated through `public/catalog/terms.json`. */
  category: string;
  /** Polish names; translated through `public/catalog/terms.json`. */
  subTags?: string[];
  description?: LocalizedInput;
  /** Lower numbers are shown first. Items without `order` follow, sorted by category and title. */
  order?: number;
}

export interface CatalogFile {
  name: string;
  /** Path relative to the site root (without the Vite base). */
  path: string;
  ext: string;
  size: number;
}

export interface CatalogItem {
  /** Folder path inside the section, e.g. `architektura/sciany/sciana-solbet-welna`. */
  id: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  category: string;
  subTags: string[];
  description: LocalizedText;
  order?: number;
  thumbnail: string | null;
  images: string[];
  files: CatalogFile[];
}

export interface Catalog {
  sections: Record<string, CatalogItem[]>;
  /** Polish category / sub-tag name → English name. */
  terms: Record<string, string>;
}
