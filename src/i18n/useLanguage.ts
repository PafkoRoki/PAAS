import { createContext, useContext } from "react";
import type { Lang } from "../catalog/types";
import type { Strings } from "./strings";

export interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Strings;
  /** Translates a catalogue category / sub-tag (stored in Polish). */
  term: (name: string) => string;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}
