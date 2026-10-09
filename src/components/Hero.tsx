import { lazy, Suspense, useEffect, useState } from "react";
import "./Hero.css";

// Three.js is large; load it in a separate chunk so the page renders first.
const PixelTrail = lazy(() => import("./PixelTrail"));

export default function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className={`hero ${visible ? "visible" : ""}`}>
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

      <div className="hero-nav">
        <a href="#paas">
          <h1>P A A S</h1>
        </a>
      </div>

      <div className="hero-nav">
        <a href="#libraries">
          <h1>Libraries</h1>
        </a>
      </div>

      <div className="hero-nav">
        <a href="#materials">
          <h1>Materials</h1>
        </a>
      </div>
    </section>
  );
}