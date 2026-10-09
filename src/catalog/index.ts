import catalog from 'virtual:catalog';

export type { CatalogItem, CatalogFile } from './types';

export const libraries = catalog.biblioteki ?? [];
export const materials = catalog.materialy ?? [];

/** Resolves a path from `public/` against the deploy base (`/PAAS/`). */
export const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`;

export function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
