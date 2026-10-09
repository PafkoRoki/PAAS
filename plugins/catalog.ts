import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';
import type {
  Catalog,
  CatalogFile,
  CatalogItem,
  CatalogMeta,
  LocalizedInput,
  LocalizedText
} from '../src/catalog/types';

/**
 * Builds the `virtual:catalog` module from `public/catalog/<section>/.../meta.json`.
 *
 * Each folder that contains a `meta.json` is one catalogue item. Next to it:
 *   thumb.(jpg|png|webp)   – card thumbnail (optional, falls back to the first image)
 *   any other image        – modal gallery, sorted by name
 *   .rfa/.rvt/.ttf/...     – downloadable files
 *
 * `public/catalog/terms.json` translates category and sub-tag names (Polish → English).
 */

const VIRTUAL_ID = 'virtual:catalog';
const RESOLVED_ID = '\0' + VIRTUAL_ID;

const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif']);
const DOWNLOAD_EXT = new Set([
  '.rfa', '.rvt', '.rte', '.rft', '.adsklib', '.pat', '.lin', '.txt',
  '.ttf', '.otf', '.dwg', '.zip', '.pdf'
]);

const collator = new Intl.Collator('pl', { numeric: true, sensitivity: 'base' });

function toUrlPath(...segments: string[]) {
  return segments
    .flatMap(s => s.split(/[\\/]/))
    .filter(Boolean)
    .map(encodeURIComponent)
    .join('/');
}

const isLocalizedInput = (v: unknown): v is LocalizedInput =>
  typeof v === 'string' ||
  (typeof v === 'object' &&
    v !== null &&
    typeof (v as { pl?: unknown }).pl === 'string' &&
    ['undefined', 'string'].includes(typeof (v as { en?: unknown }).en));

function localize(value: LocalizedInput | undefined): LocalizedText {
  if (value === undefined) return { pl: '', en: '' };
  if (typeof value === 'string') return { pl: value, en: value };
  return { pl: value.pl, en: value.en || value.pl };
}

function readMeta(file: string): CatalogMeta {
  let raw: unknown;
  try {
    raw = JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (err) {
    throw new Error(`[catalog] ${file}: invalid JSON (${(err as Error).message})`);
  }
  const m = raw as Partial<CatalogMeta>;
  const problems: string[] = [];
  const textFormat = 'a string or { "pl": "...", "en": "..." }';
  if (!isLocalizedInput(m.title) || !localize(m.title).pl.trim()) problems.push(`"title" must be ${textFormat}`);
  if (m.subtitle !== undefined && !isLocalizedInput(m.subtitle)) problems.push(`"subtitle" must be ${textFormat}`);
  if (m.description !== undefined && !isLocalizedInput(m.description))
    problems.push(`"description" must be ${textFormat}`);
  if (typeof m.category !== 'string' || !m.category.trim()) problems.push('"category" must be a non-empty string');
  if (m.subTags !== undefined && !(Array.isArray(m.subTags) && m.subTags.every(t => typeof t === 'string')))
    problems.push('"subTags" must be an array of strings');
  if (m.order !== undefined && typeof m.order !== 'number') problems.push('"order" must be a number');
  if (problems.length) throw new Error(`[catalog] ${file}:\n  - ${problems.join('\n  - ')}`);
  return m as CatalogMeta;
}

function readItem(sectionDir: string, itemDir: string, publicDir: string): CatalogItem {
  const meta = readMeta(path.join(itemDir, 'meta.json'));
  const entries = fs.readdirSync(itemDir, { withFileTypes: true }).filter(e => e.isFile());
  const url = (name: string) => toUrlPath(path.relative(publicDir, itemDir), name);

  let thumbnail: string | null = null;
  const images: string[] = [];
  const files: CatalogFile[] = [];

  for (const e of [...entries].sort((a, b) => collator.compare(a.name, b.name))) {
    const ext = path.extname(e.name).toLowerCase();
    if (IMAGE_EXT.has(ext)) {
      if (path.basename(e.name, ext).toLowerCase() === 'thumb') thumbnail = url(e.name);
      else images.push(url(e.name));
    } else if (DOWNLOAD_EXT.has(ext)) {
      files.push({
        name: e.name,
        path: url(e.name),
        ext: ext.slice(1),
        size: fs.statSync(path.join(itemDir, e.name)).size
      });
    }
  }

  return {
    id: path.relative(sectionDir, itemDir).split(path.sep).join('/'),
    title: localize(meta.title),
    subtitle: localize(meta.subtitle),
    category: meta.category,
    subTags: meta.subTags ?? [],
    description: localize(meta.description),
    order: meta.order,
    thumbnail: thumbnail ?? images[0] ?? null,
    images: images.length ? images : thumbnail ? [thumbnail] : [],
    files
  };
}

function findItemDirs(dir: string): string[] {
  if (fs.existsSync(path.join(dir, 'meta.json'))) return [dir];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter(e => e.isDirectory())
    .flatMap(e => findItemDirs(path.join(dir, e.name)));
}

function compareItems(a: CatalogItem, b: CatalogItem) {
  const ao = a.order ?? Infinity;
  const bo = b.order ?? Infinity;
  if (ao !== bo) return ao - bo;
  return (
    collator.compare(a.category, b.category) ||
    collator.compare(a.subTags[0] ?? '', b.subTags[0] ?? '') ||
    collator.compare(a.title.pl, b.title.pl)
  );
}

function readTerms(catalogDir: string): Record<string, string> {
  const file = path.join(catalogDir, 'terms.json');
  if (!fs.existsSync(file)) return {};
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (err) {
    throw new Error(`[catalog] ${file}: invalid JSON (${(err as Error).message})`);
  }
}

export function buildCatalog(catalogDir: string, publicDir: string): Catalog {
  const catalog: Catalog = { sections: {}, terms: {} };
  if (!fs.existsSync(catalogDir)) return catalog;

  for (const section of fs.readdirSync(catalogDir, { withFileTypes: true })) {
    if (!section.isDirectory()) continue;
    const sectionDir = path.join(catalogDir, section.name);
    catalog.sections[section.name] = findItemDirs(sectionDir)
      .map(dir => readItem(sectionDir, dir, publicDir))
      .sort(compareItems);
  }

  catalog.terms = readTerms(catalogDir);
  const untranslated = new Set(
    Object.values(catalog.sections)
      .flat()
      .flatMap(item => [item.category, ...item.subTags])
      .filter(term => !(term in catalog.terms))
  );
  if (untranslated.size)
    console.warn(`[catalog] terms.json has no English name for: ${[...untranslated].join(', ')}`);

  return catalog;
}

export default function catalogPlugin(): Plugin {
  let catalogDir = '';
  let publicDir = '';

  return {
    name: 'paas-catalog',

    configResolved(config) {
      publicDir = config.publicDir;
      catalogDir = path.join(publicDir, 'catalog');
    },

    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID;
    },

    load(id) {
      if (id !== RESOLVED_ID) return;
      return `export default ${JSON.stringify(buildCatalog(catalogDir, publicDir))};`;
    },

    // Adding, removing or editing anything in public/catalog reloads the page in dev.
    configureServer(server) {
      const onChange = (file: string) => {
        if (!path.resolve(file).startsWith(path.resolve(catalogDir))) return;
        const mod = server.moduleGraph.getModuleById(RESOLVED_ID);
        if (mod) server.moduleGraph.invalidateModule(mod);
        server.ws.send({ type: 'full-reload' });
      };
      server.watcher.add(catalogDir);
      server.watcher.on('add', onChange);
      server.watcher.on('unlink', onChange);
      server.watcher.on('change', onChange);
    }
  };
}
