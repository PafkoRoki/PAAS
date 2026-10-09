# Katalog — jak dodawać elementy

Każdy element biblioteki lub materiał to **osobny folder** w `public/catalog/`.
Strona sama zbiera wszystkie foldery z plikiem `meta.json`, nie trzeba nic zmieniać w kodzie.

```
public/catalog/
├── biblioteki/                       ← sekcja „Biblioteki”
│   └── architektura/sciany/          ← dowolne podfoldery (tylko porządek na dysku)
│       └── sciana-solbet-welna/      ← jeden element
│           ├── meta.json             ← opis (wymagany)
│           ├── thumb.jpg             ← miniatura na kafelku
│           ├── 1.jpg, 2.jpg …        ← galeria w podglądzie
│           └── sciana-solbet-welna.rfa  ← plik(i) do pobrania
└── materialy/                        ← sekcja „Materiały”
```

## meta.json

```json
{
  "title": "Ściana Solbet + wełna",
  "subtitle": "Ściana murowana dwuwarstwowa",
  "category": "Architektura",
  "subTags": ["Ściany"],
  "description": "Opcjonalny dłuższy opis.",
  "order": 1
}
```

| Pole | Wymagane | Opis |
| --- | --- | --- |
| `title` | tak | Nazwa na kafelku |
| `category` | tak | Główny filtr (np. Architektura, Beton) |
| `subtitle` | nie | Podtytuł |
| `subTags` | nie | Podfiltry, lista tekstów |
| `description` | nie | Opis w podglądzie |
| `order` | nie | Przypina element wyżej (mniejsza liczba = wcześniej). Bez tego sortowanie: kategoria → podtag → nazwa |

Błąd w `meta.json` (brak `title`, zły JSON) zatrzyma `npm run dev` / `npm run build` z dokładną ścieżką pliku.

## Pliki w folderze

- **Miniatura**: `thumb.jpg` / `.png` / `.webp`. Bez niej użyte zostanie pierwsze zdjęcie. Bez żadnego zdjęcia kafelek dostaje szary wzór.
- **Galeria**: wszystkie inne obrazy, kolejność alfabetyczna (`1.jpg`, `2.jpg`, …).
- **Do pobrania**: `.rfa .rvt .rte .rft .adsklib .pat .lin .txt .ttf .otf .dwg .zip .pdf`. Każdy plik dostaje własny przycisk z rozmiarem. Bez pliku pokazuje się „PLIK WKRÓTCE”.

## Wskazówki przy dużej bibliotece

- Nazwy folderów i plików: małe litery, bez polskich znaków i spacji (`okno-aluprof-mb104`), bo stają się adresami URL.
- Miniatury: ok. 800 px szerokości, `.webp` lub `.jpg` ~80%. Kafelki ładują się leniwie, ale lżejsze pliki to szybsza strona.
- GitHub: pojedynczy plik max **100 MB**, opublikowana strona (GitHub Pages) max **1 GB**. Przy bardzo dużych rodzinach rozważ `.zip` lub GitHub Releases.
- Pliki robocze (DWG, backupy, eksporty) trzymaj w `_source/`. Ten folder jest w `.gitignore` i nie trafia na stronę.
