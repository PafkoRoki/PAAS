import { useState } from "react";
import "./Carousel.css";

const software = [
    {
      name: "Autodesk Revit",
      icon: "https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/icons/revit.svg",
      description:
        "Projektowanie w technologii BIM z wykorzystaniem jednego, spójnego modelu danych umożliwiającego tworzenie dokumentacji oraz koordynację wielobranżową",
    },
    {
      name: "Autodesk AutoCAD",
      icon: "https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/icons/autocad.svg",
      description:
        "Standardowe narzędzie CAD do precyzyjnego tworzenia rysunków 2D i 3D, detali technicznych oraz dokumentacji wykonawczej",
    },
    {
      name: "SketchUp",
      icon: "https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/icons/sketchup.svg",
      description:
        "Intuicyjne i szybkie narzędzie do modelowania 3D, szczególnie przydatne na etapie koncepcji i analiz przestrzennych",
    },
    {
      name: "D5 Render",
      icon: "https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/icons/d5render.svg",
      description:
        "Silnik renderujący w czasie rzeczywistym umożliwiający tworzenie fotorealistycznych wizualizacji, animacji i symulacji światła",
    },
    {
      name: "GitHub",
      icon: "https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/icons/github.svg",
      description:
        "Platforma do zarządzania kodem źródłowym i współpracy zespołowej oparta o system kontroli wersji Git",
    },
    {
      name: "React",
      icon: "https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/icons/react.svg",
      description:
        "Biblioteka JavaScript do budowania interfejsów użytkownika w oparciu o komponenty i reaktywne zarządzanie stanem",
    },
    {
      name: "Vite",
      icon: "https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/icons/vite.svg",
      description:
        "Nowoczesne środowisko developerskie zapewniające szybkie uruchamianie projektów oraz wydajny proces budowania aplikacji",
    },
    {
      name: "Sketchfab",
      icon: "https://static.sketchfab.com/img/press/logos/sketchfab-logo.svg",
      description:
        "Platforma internetowa do publikowania, prezentowania i udostępniania interaktywnych modeli 3D bezpośrednio w przeglądarce",
    },
];

export default function Carousel() {
  const [index, setIndex] = useState(0);

  const prev = () => {
    setIndex((prev) => (prev === 0 ? software.length - 1 : prev - 1));
  };

  const next = () => {
    setIndex((prev) => (prev === software.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="Carousel">
      <button className="nav left" onClick={prev}>‹</button>

        <div className="slide">
          <img src={software[index].icon} alt={software[index].name} />
          <h3>{software[index].name}</h3>
          <p className="description">{software[index].description}</p>
        </div>

      <button className="nav right" onClick={next}>›</button>
    </div>
  );
}
