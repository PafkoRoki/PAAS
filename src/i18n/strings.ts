import type { Lang } from "../catalog/types";

const plPlural = new Intl.PluralRules("pl");
const plItems = (n: number) => {
  const form = plPlural.select(n);
  return `${n} ${form === "one" ? "element" : form === "few" ? "elementy" : "elementów"}`;
};

const pl = {
  pageTitle: "P A A S — biblioteki Revit",

  nav: {
    library: "BIBLIOTEKA",
    contact: "KONTAKT",
    libraryAria: "Przejdź do biblioteki",
    contactAria: "Kontakt",
  },

  menu: {
    open: "Menu",
    close: "Zamknij",
    openAria: "Otwórz menu",
    closeAria: "Zamknij menu",
    socials: "Social media",
    empty: "Brak pozycji",
  },

  language: {
    switchAria: "Zmień język",
  },

  library: {
    heading: "BIBLIOTEKA",
    intro: "Rodziny, typy systemowe i materiały Revit dopasowane do polskich norm i rysunku technicznego.",
  },

  catalog: {
    all: "Wszystkie",
    search: "Szukaj…",
    clearSearch: "Wyczyść wyszukiwanie",
    clearFilters: "Wyczyść filtry",
    noResults: "Brak wyników.",
    items: plItems,
    viewThumbnails: "Miniatury",
    viewList: "Lista",
    ribbonCategories: "Kategorie",
    ribbonSearch: "Wyszukaj",
    ribbonView: "Widok",
    minimizeRibbon: "Zwiń wstążkę",
    expandRibbon: "Rozwiń wstążkę",
    columns: { name: "Nazwa", category: "Kategoria", subTag: "Podkategoria", files: "Pliki" },
    download: (ext: string) => `POBIERZ PLIK .${ext}`,
    comingSoon: "PLIK WKRÓTCE",
    close: "Zamknij",
  },

  footer: {
    callAria: "Zadzwoń",
    emailAria: "Napisz e-mail",
  },
};

export type Strings = typeof pl;

const en: Strings = {
  pageTitle: "P A A S — Revit libraries",

  nav: {
    library: "LIBRARY",
    contact: "CONTACT",
    libraryAria: "Go to the library",
    contactAria: "Contact",
  },

  menu: {
    open: "Menu",
    close: "Close",
    openAria: "Open menu",
    closeAria: "Close menu",
    socials: "Socials",
    empty: "No items",
  },

  language: {
    switchAria: "Change language",
  },

  library: {
    heading: "LIBRARY",
    intro: "Revit families, system types and materials tailored to Polish codes and technical drawing standards.",
  },

  catalog: {
    all: "All",
    search: "Search…",
    clearSearch: "Clear search",
    clearFilters: "Clear filters",
    noResults: "No results.",
    items: (n: number) => `${n} ${n === 1 ? "item" : "items"}`,
    viewThumbnails: "Thumbnails",
    viewList: "List",
    ribbonCategories: "Categories",
    ribbonSearch: "Search",
    ribbonView: "View",
    minimizeRibbon: "Minimize the ribbon",
    expandRibbon: "Expand the ribbon",
    columns: { name: "Name", category: "Category", subTag: "Subcategory", files: "Files" },
    download: (ext: string) => `DOWNLOAD .${ext} FILE`,
    comingSoon: "FILE COMING SOON",
    close: "Close",
  },

  footer: {
    callAria: "Call",
    emailAria: "Send an e-mail",
  },
};

export const strings: Record<Lang, Strings> = { pl, en };
