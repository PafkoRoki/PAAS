# Katalog — jak dodawać elementy

Każdy element biblioteki lub materiał to **osobny folder** w `public/catalog/`.
Strona sama zbiera wszystkie foldery z plikiem `meta.json`, nie trzeba nic zmieniać w kodzie.

```
public/catalog/
├── biblioteki/                       ← rodziny i typy (zakładka = kategoria)
│   └── architektura/sciany/          ← dowolne podfoldery (tylko porządek na dysku)
│       └── sciana-solbet-welna/      ← jeden element
│           ├── meta.json             ← opis (wymagany)
│           ├── thumb.jpg             ← miniatura na kafelku
│           ├── 1.jpg, 2.jpg …        ← galeria w podglądzie
│           └── sciana-solbet-welna.rfa  ← plik(i) do pobrania
├── materialy/                        ← materiały (jedna zakładka „Materiały”)
│   └── section.json                  ← { "tab": "Materiały" }
└── terms.json                        ← tłumaczenia kategorii i podtagów na angielski
```

## meta.json

```json
{
  "title": { "pl": "Ściana Solbet + wełna", "en": "Solbet wall + mineral wool" },
  "subtitle": { "pl": "Ściana murowana dwuwarstwowa", "en": "Two-layer masonry wall" },
  "category": "Architektura",
  "subTags": ["Ściany"],
  "description": { "pl": "Opcjonalny dłuższy opis.", "en": "Optional longer description." },
  "order": 1
}
```

`title`, `subtitle` i `description` mogą też być zwykłym tekstem (`"title": "Ściana"`). Wtedy po angielsku pokaże się ten sam polski tekst. Tak samo, gdy brakuje `"en"`.

| Pole | Wymagane | Opis |
| --- | --- | --- |
| `title` | tak | Nazwa na kafelku |
| `category` | tak | Główny filtr, **po polsku** (np. Architektura, Beton) |
| `subtitle` | nie | Podtytuł |
| `subTags` | nie | Podfiltry, lista tekstów **po polsku** |
| `description` | nie | Opis w podglądzie |
| `order` | nie | Przypina element wyżej (mniejsza liczba = wcześniej). Bez tego sortowanie: kategoria → podtag → nazwa |

Błąd w `meta.json` (brak `title`, zły JSON) zatrzyma `npm run dev` / `npm run build` z dokładną ścieżką pliku.

## Zakładki i panele wstążki

Wszystko trafia do jednego katalogu. Na wstążce:

- **zakładka**: kategoria elementu (Architektura, Konstrukcja…),
- **panel**: też kategoria,
- **duże przyciski**: podkategorie (`subTags`).

Folder sekcji może mieć `section.json` z polem `tab`. Wtedy wszystkie jego elementy lądują w jednej zakładce, a ich kategorie stają się osobnymi panelami, jak w Revicie. Tak jest zrobione dla materiałów:

```json
{ "tab": "Materiały" }
```

Zakładka „Materiały” ma panele Beton, Drewno, Grunt, Izolacja, Mur i Szkło. Kliknięcie tytułu panelu filtruje cały panel. Nazwę zakładki też trzeba dodać do `terms.json`.

## Tłumaczenia kategorii — terms.json

Kategorie i podtagi wpisujesz w `meta.json` tylko po polsku. Angielskie nazwy są raz, w `public/catalog/terms.json`:

```json
{
  "Architektura": "Architecture",
  "Ściany": "Walls"
}
```

Gdy dodasz nową kategorię lub podtag bez wpisu w `terms.json`, `npm run dev` / `build` wypisze ostrzeżenie, a po angielsku zostanie polska nazwa.

## Ikony na wstążce

Kategorie są zakładkami wstążki, a podkategorie dużymi przyciskami z ikoną. Każda ikona to **aksonometria (izometria) w sześcianie 1×1×1**, zdefiniowana w [src/components/catalog/icons.tsx](src/components/catalog/icons.tsx).

Element opisujesz bryłami we współrzędnych sześcianu (0–1): **x** w prawo-przód, **y** w lewo-przód, **z** w górę. Rzut i cieniowanie (góra jasna, lewa średnia, prawa ciemna) liczy kod:

```tsx
// ściana dwuwarstwowa: mur + izolacja
const wall = (
  <>
    {box([0, 0.3, 0, 1, 0.56, 1], CONCRETE)}   // [x0, y0, z0, x1, y1, z1], kolor
    {box([0, 0.56, 0, 1, 0.74, 1], INSULATION)}
  </>
);
```

- `box()`: prostopadłościan, `face()`: dowolna ściana z punktów 3D, `line()`: linia 3D, `planeText()`: tekst w pionowej płaszczyźnie.
- Bryły rysuj **od tyłu do przodu** (mniejsze x+y najpierw, niższe z najpierw).
- `SHAPES`: przypisanie polskiej nazwy podkategorii do rysunku.
- `MATERIALS`: materiały są sześcianem-próbką w kolorze materiału, z wzorem `dots` (kruszywo), `grain` (słoje), `fibres` (włókna) albo `glass`.

Nowa podkategoria bez wpisu dostaje ikonę ogólną (mała kostka w sześcianie), więc nic się nie psuje.

## Pliki w folderze

- **Miniatura**: `thumb.jpg` / `.png` / `.webp`. Bez niej użyte zostanie pierwsze zdjęcie. Bez żadnego zdjęcia kafelek dostaje szary wzór.
- **Galeria**: wszystkie inne obrazy, kolejność alfabetyczna (`1.jpg`, `2.jpg`, …).
- **Do pobrania**: `.rfa .rvt .rte .rft .adsklib .pat .lin .txt .ttf .otf .dwg .zip .pdf`. Każdy plik dostaje własny przycisk z rozmiarem. Bez pliku pokazuje się „PLIK WKRÓTCE”.

## Wskazówki przy dużej bibliotece

- Nazwy folderów i plików: małe litery, bez polskich znaków i spacji (`okno-aluprof-mb104`), bo stają się adresami URL.
- Miniatury: ok. 800 px szerokości, `.webp` lub `.jpg` ~80%. Kafelki ładują się leniwie, ale lżejsze pliki to szybsza strona.
- GitHub: pojedynczy plik max **100 MB**, opublikowana strona (GitHub Pages) max **1 GB**. Przy bardzo dużych rodzinach rozważ `.zip` lub GitHub Releases.
- Pliki robocze (DWG, backupy, eksporty) trzymaj w `_source/`. Ten folder jest w `.gitignore` i nie trafia na stronę.
