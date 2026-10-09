/** Shape of `meta.json` inside every catalogue item folder. */
export interface CatalogMeta {
  title: string;
  subtitle?: string;
  category: string;
  subTags?: string[];
  description?: string;
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
  title: string;
  subtitle: string;
  category: string;
  subTags: string[];
  description: string;
  order?: number;
  thumbnail: string | null;
  images: string[];
  files: CatalogFile[];
}

export type Catalog = Record<string, CatalogItem[]>;
