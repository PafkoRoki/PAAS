import { useState, useRef } from "react";
import "./ProjectTile.css";

const projects = [
  {
    id: "p0",
    title: "Solbet + wełna",
    subtitle: "Ściana murowana dwuwarstwowa",
    tags: ["Ściana"],
    year: 2025,
    thumbnail:
      "https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/hero/portfolio_hero.jpg",
    images: [
      "https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/hero/Mockup/1.jpg",
            ],
    description:
      "",
  },
  {
    id: "p0",
    title: "Solbet + EPS",
    subtitle: "Ściana murowana dwuwarstwowa",
    tags: ["Ściana"],
    year: 2025,
    thumbnail:
      "https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/hero/portfolio_hero.jpg",
    images: [
      "https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/hero/Mockup/1.jpg",
            ],
    description:
      "",
  }, 
  {
    id: "p1",
    title: "Nowa Jowita",
    subtitle: "Projekt przebudowy Domu Studenckiego Jowita wraz z funkcjami towarzyszącymi",
    tags: ["Drzwi"],
    year: 2025,
    thumbnail:
      "https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/hero/jowita_hero.jpg",
    images: [
      "https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/hero/Jowita/1.jpg",
      "https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/hero/Jowita/2.jpg",
      "https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/hero/Jowita/3.jpg",
      "https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/hero/Jowita/4.jpg",
      "https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/hero/Jowita/5.jpg",
      "https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/hero/Jowita/6.jpg",
      "https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/hero/Jowita/7.jpg",
      "https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/hero/Jowita/8.jpg",
            ],
    description:
      "Projekt przewiduje pokrycie całej konstrukcji szkieletowej nowoczesną ścianą kurtynową Aluprof MB-SR50N EI EFEKT, z zastosowaniem silikonowych uszczelek w kolorze RAL 5002 (indygo). Dodatkowo planowane jest dopasowanie balkonów z okładzinami czołowymi balustrad, które nawiązują do dawnej rytmiki budynku, interpretując ją w nowoczesnej formie. Całość założenia projektowego ma na celu zachowanie ducha dawnej Jowity .",
  },
  {
    id: "p2",
    title: "Przemysł",
    subtitle: "Projekt koncepcyjny budynku produkcji kamizelek balistycznych",
    tags: ["Okno"],
    year: 2024,
    thumbnail:
      "https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/hero/vest_hero.jpg",
    images: [
      "https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/hero/Vest/1.jpg",
      "https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/hero/Vest/2.jpg",
      "https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/hero/Vest/3.jpg",
      "https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/hero/Vest/4.jpg",
      "https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/hero/Vest/5.jpg",
      "https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/hero/Vest/6.jpg",
      "https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/hero/Vest/7.jpg",
      "https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/hero/Vest/8.jpg",
      "https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/hero/Vest/9.jpg",
      "https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/hero/Vest/10.jpg",
      "https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/hero/Vest/11.jpg",
      "https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/hero/Vest/12.jpg",
      "https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/hero/Vest/13.jpg",
      "https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/hero/Vest/14.jpg",
            ],
    description:
      "",
  },
  {
    id: "p3",
    title: "The Leaf",
    subtitle: "Koncepcja zagospodarowania terenu Błoni Wildeckich",
    tags: ["Komponent"],
    year: 2022,
    thumbnail:
      "https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/hero/leaf_hero.jpg",
    description:
      "",
  },
  {
    id: "p4",
    title: "Cooper - Dino",
    subtitle: "Kampus DINO studium funkcjonalno przestrzenne zagospodarowania działek",
    tags: ["Słup"],
    year: 2024,
    thumbnail:
      "https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/hero/dino_hero.jpg",
    description:
      "",
  },
  {
    id: "p5",
    title: "P I T Campus",
    subtitle: "Koncepcja zagospodarowania Kampusu Sieci Badawczej Łukasiewicz",
    tags: ["Dach"],
    year: 2024,
    thumbnail:
      "https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/hero/pit_hero.jpg",
    images: [
      "https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/hero/Pit/1.jpg",
      "https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/hero/Pit/2.jpg",
      "https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/hero/Pit/3.jpg",
      "https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/hero/Pit/4.jpg",
      "https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/hero/Pit/5.jpg",
      "https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/hero/Pit/6.jpg",
      "https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/hero/Pit/7.jpg",
      "https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/hero/Pit/8.jpg",
      "https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/hero/Pit/9.jpg",
      "https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/hero/Pit/10.jpg",
            ],  
    description:
      "",
  },
  {
    id: "p6",
    title: "Sufit",
    subtitle: "Projekt koncepcyjny budynku rekreacyjnego hali sportowej w Paku Rataje",
    tags: ["Sufit"],
    year: 2023,
    thumbnail:
      "https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/hero/sala_hero.jpg",
    images: [
      "https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/hero/sala_hero.jpg",
            ],
    description:
      "",
  },
  {
    id: "p7",
    title: "Strop",
    subtitle: "Projekt koncepcyjny budynku usługowego salonu samochodowego",
    tags: ["Strop"],
    year: 2022,
    thumbnail:
      "https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/hero/salon_hero.jpg",
    description:
      "",
  },
];

function ProjectTile() {
  const [selectedTag, setSelectedTag] = useState("Wszystkie");
  const [activeProject, setActiveProject] = useState(null);

  // 🔹 REF i logika drag
  const galleryRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e) => {
    isDown.current = true;
    startX.current = e.pageX;
    scrollLeft.current = galleryRef.current.scrollLeft;
  };

  const onMouseUp = () => {
    isDown.current = false;
  };

  const onMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();
    const walk = (e.pageX - startX.current) * 1.5; // prędkość przesuwania
    galleryRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const allTags = ["Wszystkie", ...Array.from(new Set(projects.flatMap((p) => p.tags)))];

  // 🔹 Sortowanie projektów
  const sortedProjects = [...projects].sort((a, b) => b.year - a.year);

  // 🔹 Filtrowanie
  const filtered =
    selectedTag === "Wszystkie"
      ? sortedProjects
      : sortedProjects.filter((p) => p.tags.includes(selectedTag));

  function openProject(project) {
    setActiveProject(project);
    document.body.style.overflow = "hidden";
  }

  function closeProject() {
    setActiveProject(null);
    document.body.style.overflow = "";
  }

  return (
    <div className="portfolio-container">

      {/* ▪️ Filtr tagów */}
      <div className="tags-container">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`tag ${selectedTag === tag ? "active" : ""}`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* ▪️ Grid projektów */}
      <div className="grid-container">
        {filtered.map((p) => (
          <div key={p.id} className="project-card" onClick={() => openProject(p)}>
            <img src={p.thumbnail} alt={p.title} className="project-image" />
            <div className="project-info">
              <h3>{p.title}</h3>
              <p>{p.subtitle}</p>
              <div className="project-tags">
                {p.tags.slice(0, 3).map((t) => (
                  <span key={t} className="project-tag">{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ▪️ Modal */}
      {activeProject && (
        <div className="modal-overlay" onClick={closeProject}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeProject}>×</button>

            <h2>{activeProject.title}</h2>
            <p>{activeProject.subtitle}</p>

            {/* ▪️ Galeria z drag */}
            <div
              className="modal-gallery"
              ref={galleryRef}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
            >
              {(activeProject.images || [activeProject.thumbnail]).map((img, i) => (
                <div className="gallery-slide" key={i}>
                  <img src={img} alt={`${activeProject.title} ${i + 1}`} />
                </div>
              ))}
            </div>

            <p>{activeProject.description}</p>
            <div className="project-tags">
              {activeProject.tags.map((t) => (
                <span key={t} className="project-tag">{t}</span>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default ProjectTile;