import React, { useEffect, useState } from "react";
import "./Hero.css";

export default function Hero() {
  const [visible, setVisible] = useState(false);
  const [bgImage, setBgImage] = useState(null);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(timeout);
  }, []);

  const handleMouseEnter = (image) => setBgImage(image);
  const handleMouseLeave = () => setBgImage(null);

  return (
    <section className={`hero ${visible ? "visible" : ""}`}>
      {/* Dynamiczne tło */}
      <div
        className="hero-bg"
        style={{
          backgroundImage: bgImage ? `url(${bgImage})` : "none",
          opacity: bgImage ? 1 : 0,
        }}
      ></div>

      <div className="hero-nav">
        <a
          href="#portfolio"
          onMouseEnter={() => handleMouseEnter("https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/hero/xxx.png")}
          onMouseLeave={handleMouseLeave}
        >
          <h1>P A A S</h1>
          <h2>Polish Architectural Asset System</h2>
        </a>
      </div>

    </section>
  );
}
