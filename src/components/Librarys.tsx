import React, { useState, useRef } from "react";
import "./Librarys.css";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  subTags: string[];
  year: number;
  thumbnail: string;
  images: string[];
  download?: string;
  description: string;
}

const projects: Project[] = [

  // ==========================
  // ARCHITEKTURA
  // ==========================

  {
    id: "sc1",
    title: "Ściana Solbet + wełna",
    subtitle: "Ściana murowana dwuwarstwowa",

    category: "Architektura",
    subTags: ["Ściany"],

    year: 1,

    thumbnail:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Walls/1.jpg",

    images: [
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Walls/1.jpg",
    ],

    download:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Components/Schiedel.rfa",

    description: "",
  },


  {
    id: "sc2",
    title: "Ściana Solbet + EPS",
    subtitle: "Ściana murowana dwuwarstwowa",

    category: "Architektura",
    subTags: ["Ściany"],

    year: 1,

    thumbnail:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Walls/2.jpg",

    images: [
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Walls/2.jpg",
    ],

    download:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Components/Schiedel.rfa",

    description: "",
  },


  {
    id: "dz1",
    title: "Drzwi zewnętrzne",
    subtitle: "MB-79N SI Panel Door Single",

    category: "Architektura",
    subTags: ["Drzwi"],

    year: 1,

    thumbnail:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/hero/jowita_hero.jpg",

    images: [
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/hero/Jowita/1.jpg",
    ],

    download:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Components/Schiedel.rfa",

    description: "",
  },


  {
    id: "dz2",
    title: "Drzwi wewnętrzne",
    subtitle: "MB-79N SI Panel Door Single",

    category: "Architektura",
    subTags: ["Drzwi"],

    year: 1,

    thumbnail:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/hero/jowita_hero.jpg",

    images: [
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/hero/Jowita/1.jpg",
    ],

    download:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Components/Schiedel.rfa",

    description: "",
  },


  {
    id: "o1",
    title: "Okno Aluprof Passive",
    subtitle: "MB-104 Passive AERO System",

    category: "Architektura",
    subTags: ["Okna"],

    year: 1,

    thumbnail:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/hero/vest_hero.jpg",

    images: [
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/hero/Vest/1.jpg",
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/hero/Vest/2.jpg",
    ],

    download:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Components/Schiedel.rfa",

    description: "",
  },


  {
    id: "k1",
    title: "Kot",
    subtitle: "Model kota",

    category: "Architektura",
    subTags: ["Komponenty"],

    year: 1,

    thumbnail:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Components/1.jpg",

    images: [],

    download:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Components/Schiedel.rfa",

    description: "",
  },


  {
    id: "k2",
    title: "Schiedel",
    subtitle: "Schiedel 50 x 36",

    category: "Architektura",
    subTags: ["Komponenty"],

    year: 1,

    thumbnail:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Components/2.jpg",

    images: [],

    download:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Components/Schiedel.rfa",

    description: "",
  },


  {
    id: "sl1",
    title: "Słup żelbetowy",
    subtitle: "Słup żelbetowy",

    category: "Architektura",
    subTags: ["Słupy"],

    year: 1,

    thumbnail:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/hero/dino_hero.jpg",

    images: [],

    download:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Components/Schiedel.rfa",

    description: "",
  },


  // ==========================
  // WYKOŃCZENIE
  // ==========================


  {
    id: "d1",
    title: "Dach na rąbek stojący",
    subtitle: "Dach na rąbek stojący",

    category: "Architektura",
    subTags: ["Dachy"],

    year: 1,

    thumbnail:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Roofs/1.jpg",

    images: [
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Roofs/1.jpg",
    ],

    download:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Components/Schiedel.rfa",

    description: "",
  },


  {
    id: "su1",
    title: "Sufit podwieszany",
    subtitle: "Siniat NIDA",

    category: "Architektura",
    subTags: ["Sufity"],

    year: 1,

    thumbnail:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Ceilings/1.jpg",

    images: [],

    download:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Components/Schiedel.rfa",

    description: "",
  },


  {
    id: "st1",
    title: "Podłoga na gruncie",
    subtitle: "Podłoga na gruncie",

    category: "Architektura",
    subTags: ["Podłogi"],

    year: 1,

    thumbnail:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Floors/1.jpg",

    images: [],

    download:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Components/Schiedel.rfa",

    description: "",
  },


  // ==========================
  // KONSTRUKCJA
  // ==========================


  {
    id: "blk1",
    title: "Belka",
    subtitle: "Belka",

    category: "Konstrukcja",
    subTags: ["Belki"],

    year: 1,

    thumbnail: "",

    images: [],

    download:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Components/Schiedel.rfa",

    description: "",
  },


  // ==========================
  // SYSTEMY
  // ==========================


  {
    id: "kn1",
    title: "Kanał",
    subtitle: "Kanał",

    category: "Systemy",
    subTags: ["Kanały"],

    year: 1,

    thumbnail: "",

    images: [],

    download:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Components/Schiedel.rfa",

    description: "",
  },


  // ==========================
  // OPIS
  // ==========================


  {
    id: "op1",
    title: "Rzędna punktu",
    subtitle: "Rzędna punktu",

    category: "Opisz",
    subTags: ["Rzędne punktu"],

    year: 1,

    thumbnail: "",

    images: [],

    download:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Components/Schiedel.rfa",

    description: "",
  },


  {
    id: "op2",
    title: "Wymiar",
    subtitle: "Wymiar",

    category: "Opisz",
    subTags: ["Wymiary"],

    year: 1,

    thumbnail: "",

    images: [],

    download:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Components/Schiedel.rfa",

    description: "",
  },


  {
    id: "op3",
    title: "Nachylenie",
    subtitle: "Nachylenie w punkcie",

    category: "Opisz",
    subTags: ["Nachylenia"],

    year: 1,

    thumbnail: "",

    images: [],

    download:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Components/Schiedel.rfa",

    description: "",
  },


  {
    id: "op4",
    title: "Oznaczenie okna",
    subtitle: "Oznaczenie",

    category: "Opisz",
    subTags: ["Oznaczenia"],

    year: 1,

    thumbnail: "",

    images: [],

    download:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Components/Schiedel.rfa",

    description: "",
  },


  {
    id: "op5",
    title: "Oznaczenie drzwi",
    subtitle: "Oznaczenie",

    category: "Opisz",
    subTags: ["Oznaczenia"],

    year: 1,

    thumbnail: "",

    images: [],

    download:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Components/Schiedel.rfa",

    description: "",
  },


  // ==========================
  // FONTY
  // ==========================


  {
    id: "font1",
    title: "Pismo Techniczne",
    subtitle: "Font FL Pismo Techniczne",

    category: "Opisz",
    subTags: ["Font"],

    year: 1,

    thumbnail:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/fonts/1.jpg",

    images: [],

    download:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/fonts/Pismo_Techniczne.ttf",

    description: "",
  },


  {
    id: "font2",
    title: "Boyrun",
    subtitle: "Font Hand Writing",

    category: "Opisz",
    subTags: ["Font"],

    year: 1,

    thumbnail:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/fonts/2.jpg",

    images: [],

    download:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/fonts/Boyrun.ttf",

    description: "",
  },

];

function ProjectTile() {
  // ==========================
  // STATE
  // ==========================

  const [selectedCategory, setSelectedCategory] = useState("Wszystkie");
  const [selectedSubTag, setSelectedSubTag] = useState("Wszystkie");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // ==========================
  // REFS
  // ==========================

  const galleryRef = useRef<HTMLDivElement | null>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // ==========================
  // DRAG GALERII
  // ==========================

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDown.current = true;
    startX.current = e.pageX;
    scrollLeft.current = galleryRef.current?.scrollLeft ?? 0;
  };

  const onMouseUp = () => {
    isDown.current = false;
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDown.current) return;

    e.preventDefault();

    const walk = (e.pageX - startX.current) * 1.5;
    if (galleryRef.current) galleryRef.current.scrollLeft = scrollLeft.current - walk;
  };

  // ==========================
  // FILTRY
  // ==========================

  const categories = [
    "Wszystkie",
    ...new Set(projects.map((p) => p.category)),
  ];

  const subTags = [
    "Wszystkie",
    ...new Set(
      projects
        .filter(
          (p) =>
            selectedCategory === "Wszystkie" ||
            p.category === selectedCategory
        )
        .flatMap((p) => p.subTags)
    ),
  ];

  const sortedProjects = [...projects].sort((a, b) => b.year - a.year);

  const filtered = sortedProjects.filter((p) => {
    const categoryMatch =
      selectedCategory === "Wszystkie" ||
      p.category === selectedCategory;

    const subTagMatch =
      selectedSubTag === "Wszystkie" ||
      p.subTags.includes(selectedSubTag);

    return categoryMatch && subTagMatch;
  });

  // ==========================
  // MODAL
  // ==========================

  function openProject(project: Project) {
    setActiveProject(project);
    document.body.style.overflow = "hidden";
  }

  function closeProject() {
    setActiveProject(null);
    document.body.style.overflow = "";
  }

  const galleryImages =
    activeProject && activeProject.images.length > 0
      ? activeProject.images
      : activeProject
      ? [activeProject.thumbnail]
      : [];

function downloadProject(project: Project) {
  if (!project.download) return;

  const link = document.createElement("a");
  link.href = project.download;
  link.download = "";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

  // ==========================
  // JSX
  // ==========================

  return (
    <div>
      {/* ==========================
          GŁÓWNE KATEGORIE
      ========================== */}

      <div className="tags-container">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setSelectedSubTag("Wszystkie");
            }}
            className={`tag ${
              selectedCategory === category ? "active" : ""
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* ==========================
          PODTAGI
      ========================== */}

      <div className="tags-container subtags">
        {subTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedSubTag(tag)}
            className={`tag ${
              selectedSubTag === tag ? "active" : ""
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* ==========================
          GRID
      ========================== */}

      <div className="grid-container">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="project-card"
            onClick={() => openProject(p)}
          >
            <img
              src={p.thumbnail}
              alt={p.title}
              className="project-image"
            />

            <div className="project-info">
              <h3>{p.title}</h3>

              <p>{p.subtitle}</p>

              <div className="project-tags">
                <span className="project-tag category">
                  {p.category}
                </span>

                {p.subTags.slice(0, 3).map((t) => (
                  <span key={t} className="project-tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ==========================
          MODAL
      ========================== */}

      {activeProject && (
        <div
          className="modal-overlay"
          onClick={closeProject}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-btn"
              onClick={closeProject}
            >
              ×
            </button>

            <h2>{activeProject.title}</h2>

            <p>{activeProject.subtitle}</p>

            <div
              className="modal-gallery"
              ref={galleryRef}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
            >
              {galleryImages.map((img, i) => (
                <div
                  className="gallery-slide"
                  key={i}
                >
                  <img
                    src={img}
                    alt={`${activeProject.title} ${i + 1}`}
                  />
                </div>
              ))}
            </div>

            <p>{activeProject.description}</p>

            <div className="modal-actions">
              <button
                className="download-btn"
                onClick={() => downloadProject(activeProject)}
              >
                POBIERZ PLIK .rfa
              </button>
            </div>

            <div className="project-tags">
              <span className="project-tag category">
                {activeProject.category}
              </span>

              {activeProject.subTags.map((tag) => (
                <span
                  key={tag}
                  className="project-tag"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectTile;