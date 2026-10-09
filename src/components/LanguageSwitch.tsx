import { LANGUAGES } from "../catalog/types";
import { useLanguage } from "../i18n/useLanguage";
import "./LanguageSwitch.css";

export default function LanguageSwitch() {
  const { lang, setLang, t } = useLanguage();

  return (
    <div className="lang-switch" role="group" aria-label={t.language.switchAria}>
      {LANGUAGES.map((code) => (
        <button
          key={code}
          type="button"
          className={`lang-switch__btn ${lang === code ? "active" : ""}`}
          aria-pressed={lang === code}
          onClick={() => setLang(code)}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
