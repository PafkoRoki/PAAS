<div align="center">

<img src="https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Assets/logo.svg" alt="PAAS logo" width="220" />

# P A A S

**Revit libraries built for Polish drawing standards, free to download.**

[**→ Visit the live site**](https://PafkoRoki.github.io/PAAS)

![React](https://img.shields.io/badge/React_19-20232A?style=flat&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=flat&logo=threedotjs&logoColor=white)
![Autodesk Revit](https://img.shields.io/badge/Autodesk_Revit-186BFF?style=flat&logo=autodesk&logoColor=white)

<img src="https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Assets/docs.png" alt="Sample documentation made with PAAS families" width="900" />

</div>

---

## Why PAAS?

Out of the box, Autodesk Revit follows American and generic international conventions. In a Polish office that usually means hours spent changing hatch patterns, rebuilding wall types, fixing level markers and swapping annotation fonts before a drawing passes as proper Polish *dokumentacja budowlana*.

PAAS is a growing set of ready-to-use Revit content built for **Polish standards and technical drawing practice**. You download a family, load it into your project and keep working.

> Less time fixing templates, more time designing.

## What's inside

The site works as a browsable catalogue. Each item has a preview, a short description and a **one-click download**.

### 📐 Libraries: Revit families and system types

| Category | What you'll find |
| --- | --- |
| **Architecture** | Walls (e.g. Solbet blocks + mineral wool / EPS), floors, ceilings, roofs, doors, windows, columns |
| **Structure** | Beams |
| **Systems** | Chimney and ventilation ducts (Schiedel) |
| **Annotation** | Level markers, slope symbols, dimension styles, tags and a technical drawing font |

### 🧱 Materials: render-ready Revit materials

| Category | Examples |
| --- | --- |
| **Concrete** | Structural concrete, lean concrete, screed, aerated concrete |
| **Insulation** | EPS, mineral wool |
| **Soil** | Native soil, sand |
| **Masonry · Timber · Glass** | Brick, spruce, clear glass |

Both catalogues have **two-level filters** (category → sub-tag) and a fullscreen preview with a draggable image gallery.

## The website

The site is meant to be fun to look at, so it isn't a plain file list:

- **Iridescent WebGL background** written with [OGL](https://github.com/oframe/ogl) that reacts to your mouse
- **Pixel trail hero**: a [React Three Fiber](https://r3f.docs.pmnd.rs/) shader that follows the cursor with a gooey SVG filter
- **Staggered slide-in menu** animated with [GSAP](https://gsap.com/)
- **Custom type**: TASA Orbiter, Boyrun and *FL Pismo Techniczne*, a font based on Polish technical lettering

Several of the animated components are adapted from [React Bits](https://reactbits.dev/).

## Tech stack

| Layer | Tools |
| --- | --- |
| UI | React 19 + TypeScript (strict) |
| Build | Vite |
| 3D / shaders | Three.js, @react-three/fiber, @react-three/drei, OGL |
| Animation | GSAP |
| Lint | oxlint |
| Hosting | GitHub Pages via `gh-pages` |

## Getting started

```bash
git clone https://github.com/PafkoRoki/PAAS.git
cd PAAS
npm install
npm run dev        # start the dev server
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Starts the local dev server with hot reload |
| `npm run typecheck` | Runs the TypeScript checks only |
| `npm run build` | Type-checks, then builds into `dist/` |
| `npm run preview` | Serves the production build locally |
| `npm run lint` | Runs oxlint |
| `npm run deploy` | Builds and publishes to GitHub Pages |

## Adding a new family or material

All catalogue entries are plain typed objects. Open [`src/components/Librarys.tsx`](src/components/Librarys.tsx) or [`src/components/Materials.tsx`](src/components/Materials.tsx) and add an entry to the `projects` array:

```ts
{
  id: "sc3",
  title: "Ściana Ytong + wełna",
  subtitle: "Ściana murowana dwuwarstwowa",
  category: "Architektura",
  subTags: ["Ściany"],
  year: 1,
  thumbnail: "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Walls/3.jpg",
  images: ["https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Walls/3.jpg"],
  download: "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Walls/sc3.rvt",
  description: "",
}
```

Put the preview images and the `.rfa` / `.rvt` file in the matching folder under `public/`, such as `Walls/`, `Floors/`, `Roofs/` or `Materials/`. New categories and sub-tags appear in the filters automatically. The `Project` interface makes TypeScript flag any entry with a missing field.

## Project structure

```
public/
├── Walls/ Floors/ Ceilings/ Roofs/   # previews and Revit files per category
├── Components/ Materials/ Pats/      # families, materials, hatch patterns
├── Assets/                           # logo and site imagery
└── fonts/
src/
├── App.tsx                           # page layout and sections
└── components/
    ├── Librarys.tsx                  # Revit libraries catalogue
    ├── Materials.tsx                 # materials catalogue
    ├── Hero.tsx / PixelTrail.tsx     # animated hero
    ├── Iridescence.tsx               # WebGL background
    ├── StaggeredMenu.tsx             # navigation
    └── Footer.tsx
```

## Contact

Got an idea for a family that should be in here, or found something that doesn't match the standard?

- GitHub: [@PafkoRoki](https://github.com/PafkoRoki)
- Instagram: [@pafkoroki](https://www.instagram.com/pafkoroki)
- Facebook: [Pafkoroki](https://pl-pl.facebook.com/Pafkoroki)

<div align="center">
<sub>Made in Poland for architects who'd rather design than fix templates.</sub>
</div>
