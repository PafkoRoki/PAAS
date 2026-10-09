import { lazy, Suspense, useEffect, useState } from "react";
import { useLanguage } from "../i18n/useLanguage";
import "./Hero.css";

// Three.js is large; load it in a separate chunk so the page renders first.
const PixelTrail = lazy(() => import("./PixelTrail"));

// The trail follows the mouse; on touch screens there is no cursor, so skip it
// (and the Three.js download) entirely.
const hasHoverPointer =
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export default function Hero() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className={`hero ${visible ? "visible" : ""}`}>
      {hasHoverPointer && (
        <div className="hero-trail">
          <Suspense fallback={null}>
            <PixelTrail
              gridSize={100}
              trailSize={0.1}
              maxAge={600}
              interpolate={1}
              color="#176cff"
              gooeyFilter={{ id: "custom-goo-filter", strength: 2 }}
            />
          </Suspense>
        </div>
      )}

      <div className="hero-nav">
        <a href="#paas">
          <h1>P A A S</h1>
        </a>
      </div>

      <div className="hero-nav">
        <a href="#libraries">
          <h1>{t.hero.libraries}</h1>
        </a>
      </div>

      <div className="hero-nav">
        <a href="#materials">
          <h1>{t.hero.materials}</h1>
        </a>
      </div>
    </section>
  );
}