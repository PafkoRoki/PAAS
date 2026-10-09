import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { LANGUAGES, type Lang } from "../catalog/types";
import { strings } from "./strings";
import { LanguageContext, type LanguageContextValue } from "./useLanguage";

const STORAGE_KEY = "paas-lang";

const isLang = (value: unknown): value is Lang => LANGUAGES.includes(value as Lang);

/** `?lang=en` in the URL wins, then the saved choice, then the browser language. */
function detectLanguage(): Lang {
  const fromUrl = new URLSearchParams(window.location.search).get("lang");
  if (isLang(fromUrl)) return fromUrl;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isLang(saved)) return saved;
  } catch {
    // storage blocked (private mode) — ignore
  }
  return navigator.language.toLowerCase().startsWith("pl") ? "pl" : "en";
}

export function LanguageProvider({ terms, children }: { terms: Record<string, string>; children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLanguage);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
    const url = new URL(window.location.href);
    url.searchParams.set("lang", next);
    window.history.replaceState(null, "", url);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = strings[lang].pageTitle;
  }, [lang]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang,
      t: strings[lang],
      term: (name) => (lang === "pl" ? name : terms[name] ?? name),
    }),
    [lang, setLang, terms]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
