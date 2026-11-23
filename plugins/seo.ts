import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';
import { buildCatalog } from './catalog';
import type { CatalogItem } from '../src/catalog/types';

/**
 * Makes the catalogue findable by search engines (the app itself renders only in the browser).
 *
 * At build time it emits, from the same `public/catalog` data as the app:
 *   e/<slug>/index.html  – one static page per item: title with keywords, description, thumbnail,
 *                          download links, breadcrumb and schema.org data
 *   e/index.html         – list of every item
 *   sitemap.xml, robots.txt
 * and puts the site title, description, social preview tags and a plain list of links into index.html,
 * so the home page has crawlable content before the app starts.
 */

interface SeoOptions {
  /** Public origin, e.g. "https://pafkoroki.github.io". */
  origin: string;
}

const SITE_NAME = 'PAAS';
const SITE_TITLE = 'PAAS — polskie rodziny, materiały i wzory .pat do Revita';
const SITE_DESCRIPTION =
  'Polskie biblioteki i standardy do Revita do pobrania: rodziny .rfa, materiały z parametrami cieplnymi, ' +
  'wzory wypełnień .pat, wiązania cegły i style wymiarowania zgodne z polskimi normami rysunku budowlanego.';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function clip(text: string, max = 155) {
  const t = text.replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(' ')) + '…';
}

/** Readable, unique URL slug: "opisz-oznaczenie-pomieszczenia", "materialy-beton-c20-25", "wzory-cegla-df-flamandzkie". */
export function itemSlug(item: CatalogItem) {
  const parts = item.id.split('/');
  const prefix = parts[0] === 'biblioteki' ? parts[1] : parts[0];
  return `${prefix}-${parts[parts.length - 1]}`;
}

function kindLabel(item: CatalogItem) {
  const ext = item.files[0]?.ext;
  if (ext === 'rfa') return 'rodzina Revit (.rfa)';
  if (ext === 'rvt') return item.tab === 'Materiały' ? 'materiał Revit (.rvt)' : 'standard Revit (.rvt)';
  if (ext === 'pat') return 'wzór wypełnienia Revit (.pat)';
  if (ext === 'ttf' || ext === 'otf') return `font (.${ext})`;
  return 'element biblioteki Revit';
}

function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1).replace('.', ',')} MB`;
}

function lastModified(catalogDir: string, item: CatalogItem) {
  const dir = path.join(catalogDir, ...item.id.split('/'));
  const times = fs.readdirSync(dir).map(f => fs.statSync(path.join(dir, f)).mtimeMs);
  return new Date(Math.max(...times)).toISOString().slice(0, 10);
}

const STYLE = `
:root{color-scheme:light dark;--bg:#fcfcfb;--ink:#0b0b0b;--ink2:#52514e;--line:#e4e3df;--accent:#176bff;--card:#fff}
@media (prefers-color-scheme:dark){:root{--bg:#1a1a19;--ink:#f0efec;--ink2:#c3c2b7;--line:#2f2f2d;--accent:#5b9bff;--card:#232322}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.55 -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif}
main{max-width:820px;margin:0 auto;padding:32px 16px 64px}a{color:var(--accent)}
header{display:flex;align-items:center;gap:12px;margin-bottom:28px}header img{height:34px}
nav.crumbs{font-size:14px;color:var(--ink2);margin-bottom:8px}nav.crumbs a{color:var(--ink2)}
h1{font-size:30px;line-height:1.2;margin:0 0 6px}.kind{color:var(--ink2);margin:0 0 20px}
.thumb{width:100%;border:1px solid var(--line);border-radius:12px;background:#fff;display:block}
.desc{margin:20px 0}.files{list-style:none;padding:0;margin:20px 0;display:grid;gap:8px}
.files a{display:flex;justify-content:space-between;gap:16px;padding:12px 16px;border:1px solid var(--line);border-radius:10px;background:var(--card);text-decoration:none;color:var(--ink);font-weight:600}
.files span{color:var(--ink2);font-weight:400}.cta{display:inline-block;margin-top:8px}
ul.index{padding-left:20px}ul.index li{margin:4px 0}h2{margin-top:32px;font-size:20px}
footer{margin-top:40px;padding-top:16px;border-top:1px solid var(--line);font-size:14px;color:var(--ink2)}`;

function page(o: { base: string; url: string; title: string; description: string; image?: string; body: string; jsonLd?: object[] }) {
  return `<!doctype html>
<html lang="pl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(o.title)}</title>
<meta name="description" content="${esc(o.description)}">
<link rel="canonical" href="${esc(o.url)}">
<link rel="icon" type="image/svg+xml" href="${o.base}site/logo.svg">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${SITE_NAME}">
<meta property="og:locale" content="pl_PL">
<meta property="og:title" content="${esc(o.title)}">
<meta property="og:description" content="${esc(o.description)}">
<meta property="og:url" content="${esc(o.url)}">
${o.image ? `<meta property="og:image" content="${esc(o.image)}">\n<meta name="twitter:card" content="summary_large_image">` : '<meta name="twitter:card" content="summary">'}
${(o.jsonLd ?? []).map(j => `<script type="application/ld+json">${JSON.stringify(j).replace(/</g, '\\u003c')}</script>`).join('\n')}
<style>${STYLE}</style>
</head>
<body>
<main>
<header><a href="${o.base}"><img src="${o.base}site/logo.svg" alt="PAAS"></a><span>Polskie biblioteki i standardy do Revita</span></header>
${o.body}
<footer>PAAS — Polish Architectural Asset System · <a href="${o.base}">katalog</a> · <a href="${o.base}e/">wszystkie elementy</a> · <a href="https://github.com/PafkoRoki/PAAS">GitHub</a></footer>
</main>
</body>
</html>
`;
}

export default function seoPlugin({ origin }: SeoOptions): Plugin {
  let base = '/';
  // items without files have no page yet: listed as plain text
  const itemLink = (i: CatalogItem) =>
    i.files.length ? `<a href="${base}e/${itemSlug(i)}/">${esc(i.title.pl)}</a>` : `${esc(i.title.pl)} (w przygotowaniu)`;
  let catalogDir = '';
  let publicDir = '';
  let isBuild = false;
  const site = () => origin.replace(/\/$/, '') + base;

  const load = () => {
    const catalog = buildCatalog(catalogDir, publicDir);
    const slugs = new Map<string, string>();
    for (const item of catalog.items) {
      const s = itemSlug(item);
      if (slugs.has(s)) throw new Error(`[seo] duplicate page slug "${s}" for ${item.id} and ${slugs.get(s)}`);
      slugs.set(s, item.id);
    }
    return catalog;
  };

  return {
    name: 'paas-seo',

    configResolved(config) {
      base = config.base;
      publicDir = config.publicDir;
      catalogDir = path.join(publicDir, 'catalog');
      isBuild = config.command === 'build';
    },

    transformIndexHtml(html) {
      const { items } = load();
      const groups = new Map<string, CatalogItem[]>();
      for (const item of items) groups.set(item.tab, [...(groups.get(item.tab) ?? []), item]);
      const list = [...groups]
        .map(([tab, its]) => `<h2>${esc(tab)}</h2><ul>${its
          .map(i => `<li>${itemLink(i)} — ${esc(kindLabel(i))}</li>`)
          .join('')}</ul>`)
        .join('');
      const head = `
    <meta name="description" content="${esc(SITE_DESCRIPTION)}" />
    <link rel="canonical" href="${site()}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta property="og:locale" content="pl_PL" />
    <meta property="og:title" content="${esc(SITE_TITLE)}" />
    <meta property="og:description" content="${esc(SITE_DESCRIPTION)}" />
    <meta property="og:url" content="${site()}" />
    <meta property="og:image" content="${site()}catalog/wzory/modelowe/cegla-df-flamandzkie/thumb.jpg" />
    <meta name="twitter:card" content="summary_large_image" />
    <script type="application/ld+json">${JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      alternateName: 'Polish Architectural Asset System',
      url: site(),
      description: SITE_DESCRIPTION,
      inLanguage: 'pl'
    })}</script>`;
      // Static content inside #root: read by crawlers, replaced by the app as soon as it renders.
      const fallback = `<main style="max-width:820px;margin:0 auto;padding:32px 16px;font-family:sans-serif">
      <h1>PAAS — polskie biblioteki i standardy do Revita</h1>
      <p>${esc(SITE_DESCRIPTION)}</p>${list}
      <p><a href="${base}e/">Wszystkie elementy</a></p></main>`;
      return html
        .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(SITE_TITLE)}</title>${head}`)
        .replace('<div id="root"></div>', `<div id="root">${fallback}</div>`);
    },

    generateBundle() {
      if (!isBuild) return;
      const { items } = load();
      const urls: { loc: string; lastmod: string }[] = [];
      const today = new Date().toISOString().slice(0, 10);

      for (const item of items) {
        if (!item.files.length) continue; // no page for items without files yet (thin content)
        const slug = itemSlug(item);
        const url = `${site()}e/${slug}/`;
        const kind = kindLabel(item);
        const text = item.description.pl || item.subtitle.pl || item.title.pl;
        const title = `${item.title.pl} – ${kind} | ${SITE_NAME}`;
        const description = clip(`${item.title.pl}: ${kind}. ${text}`);
        const image = item.thumbnail ? `${site()}${item.thumbnail}` : undefined;
        const crumbs = [item.tab, item.category !== item.tab ? item.category : null, ...item.subTags].filter(Boolean) as string[];

        const files = item.files.length
          ? `<ul class="files">${item.files
              .map(f => `<li><a href="${base}${f.path}" download>Pobierz ${esc(f.name)}<span>${formatSize(f.size)}</span></a></li>`)
              .join('')}</ul>`
          : '<p class="kind">Plik w przygotowaniu.</p>';

        const body = `
<nav class="crumbs"><a href="${base}">Katalog</a> › ${crumbs.map(esc).join(' › ')}</nav>
<h1>${esc(item.title.pl)}</h1>
<p class="kind">${esc(item.subtitle.pl ? `${item.subtitle.pl} · ${kind}` : kind)}</p>
${item.thumbnail ? `<img class="thumb" src="${base}${item.thumbnail}" alt="${esc(item.title.pl)}" width="960" height="600">` : ''}
${item.description.pl ? `<p class="desc">${esc(item.description.pl)}</p>` : ''}
${files}
<a class="cta" href="${base}?e=${encodeURIComponent(item.id)}">Zobacz w katalogu PAAS →</a>`;

        const jsonLd = [
          {
            '@context': 'https://schema.org',
            '@type': 'CreativeWork',
            name: item.title.pl,
            description: text,
            url,
            image,
            inLanguage: 'pl',
            isAccessibleForFree: true,
            keywords: ['Revit', item.category, ...item.subTags].join(', '),
            isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: site() },
            associatedMedia: item.files.map(f => ({
              '@type': 'MediaObject',
              name: f.name,
              contentUrl: `${site()}${f.path}`,
              encodingFormat: `.${f.ext}`,
              contentSize: formatSize(f.size)
            }))
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [{ name: 'Katalog', item: site() }, ...crumbs.map(c => ({ name: c })), { name: item.title.pl, item: url }].map(
              (e, i) => ({ '@type': 'ListItem', position: i + 1, ...e })
            )
          }
        ];

        this.emitFile({ type: 'asset', fileName: `e/${slug}/index.html`, source: page({ base, url, title, description, image, body, jsonLd }) });
        urls.push({ loc: url, lastmod: lastModified(catalogDir, item) });
      }

      // index of every item
      const groups = new Map<string, CatalogItem[]>();
      for (const item of items) groups.set(item.tab, [...(groups.get(item.tab) ?? []), item]);
      const indexBody = `<h1>Wszystkie elementy PAAS</h1>
<p class="kind">Rodziny, materiały, wzory wypełnień i style wymiarowania do Revita — ${items.length} elementów.</p>
${[...groups]
  .map(([tab, its]) => `<h2>${esc(tab)}</h2><ul class="index">${its
    .map(i => `<li>${itemLink(i)} <span class="kind">— ${esc(kindLabel(i))}</span></li>`)
    .join('')}</ul>`)
  .join('\n')}`;
      this.emitFile({
        type: 'asset',
        fileName: 'e/index.html',
        source: page({
          base,
          url: `${site()}e/`,
          title: `Wszystkie elementy — rodziny, materiały i wzory .pat do Revita | ${SITE_NAME}`,
          description: clip(`Spis ${items.length} elementów PAAS: ${SITE_DESCRIPTION}`),
          body: indexBody
        })
      });

      const all = [{ loc: site(), lastmod: today }, { loc: `${site()}e/`, lastmod: today }, ...urls];
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${all.map(u => `  <url><loc>${esc(u.loc)}</loc><lastmod>${u.lastmod}</lastmod></url>`).join('\n')}
</urlset>
`
      });
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\n\nSitemap: ${site()}sitemap.xml\n` });
    }
  };
}
