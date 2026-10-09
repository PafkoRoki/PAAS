import type { Lang } from "../catalog/types";

const pl = {
  pageTitle: "P A A S — biblioteki Revit",

  nav: {
    home: "START",
    about: "O PROJEKCIE",
    materials: "MATERIAŁY",
    libraries: "BIBLIOTEKI",
    contact: "KONTAKT",
    homeAria: "Przejdź na stronę główną",
    aboutAria: "O projekcie",
    materialsAria: "Zobacz materiały",
    librariesAria: "Zobacz biblioteki",
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

  hero: {
    libraries: "Biblioteki",
    materials: "Materiały",
  },

  about: {
    heading: "O PROJEKCIE",
    paragraphs: [
      "Projekt rozwijający biblioteki i zasoby dla programu Autodesk Revit, dostosowane do polskich standardów projektowania oraz dokumentacji technicznej i budowlanej. Jego celem jest ułatwienie pracy architektów i projektantów poprzez dostarczenie gotowych komponentów zgodnych z krajowymi wymaganiami i dobrymi praktykami.",
      "Dzięki P A A S użytkownicy mogą korzystać z bibliotek usprawniających tworzenie dokumentacji projektowej, zachowując zgodność z polskimi normami i standardami rysunku technicznego. Projekt wspiera efektywniejszą pracę w środowisku BIM, ogranicza konieczność ręcznego dostosowywania elementów oraz przyspiesza przygotowanie dokumentacji.",
    ],
    imageAlt: "Przykładowa dokumentacja wykonana z bibliotekami P A A S",
  },

  sections: {
    libraries: "BIBLIOTEKI",
    materials: "MATERIAŁY",
  },

  catalog: {
    all: "Wszystkie",
    search: "Szukaj…",
    noResults: "Brak wyników.",
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
    home: "HOME",
    about: "ABOUT",
    materials: "MATERIALS",
    libraries: "LIBRARIES",
    contact: "CONTACT",
    homeAria: "Go to home page",
    aboutAria: "About the project",
    materialsAria: "View materials",
    librariesAria: "View libraries",
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

  hero: {
    libraries: "Libraries",
    materials: "Materials",
  },

  about: {
    heading: "ABOUT THE PROJECT",
    paragraphs: [
      "A project that develops libraries and resources for Autodesk Revit, tailored to Polish design standards and to technical and construction documentation. Its goal is to make the work of architects and designers easier by providing ready-made components that follow national requirements and good practice.",
      "With P A A S, users get libraries that speed up the preparation of design documentation while staying consistent with Polish codes and technical drawing standards. The project supports more efficient BIM workflows, reduces the need to adjust elements by hand and shortens the time it takes to prepare documentation.",
    ],
    imageAlt: "Sample documentation made with P A A S libraries",
  },

  sections: {
    libraries: "LIBRARIES",
    materials: "MATERIALS",
  },

  catalog: {
    all: "All",
    search: "Search…",
    noResults: "No results.",
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
