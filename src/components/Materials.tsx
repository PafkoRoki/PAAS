import React, { useState, useRef } from "react";
import "./Materials.css";

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
  // MATERIAŁY
  // ==========================


  {
    id: "sc1",
    title: "Szkło",
    subtitle: "Czyste szkło",

    category: "Szkło",
    subTags: ["Czyste"],

    year: 1,

    thumbnail:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Materials/Glass/Glass_Clear.jpg",

    images: [
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Materials/Glass/Glass_Clear.jpg",
    ],

    download:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Components/Schiedel.rfa",

    description: "",
  },


  {
    id: "sc2",
    title: "Świerk",
    subtitle: "Drewno świerkowe",

    category: "Drewno",
    subTags: ["Świerk"],

    year: 1,

    thumbnail:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Materials/Wood/Spruce.jpg",

    images: [
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Materials/Wood/Spruce.jpg",
    ],

    download:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Components/Schiedel.rfa",

    description: "",
  },


  {
    id: "dz1",
    title: "Beton komórkowy",
    subtitle: "Beton komórkowy Solbet 500",

    category: "Mur",
    subTags: ["Beton komórkowy"],

    year: 1,

    thumbnail:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Materials/Brick/Solbet.jpg",

    images: [
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Materials/Brick/Solbet.jpg",
    ],

    download:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Components/Schiedel.rfa",

    description: "",
  },


  {
    id: "dz2",
    title: "Żel-Bet",
    subtitle: "Beton zbrojony",

    category: "Beton",
    subTags: ["Beton konstrukcyjny"],

    year: 1,

    thumbnail:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Materials/Concrete/Reinforced_Concrete.jpg",

    images: [
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Materials/Concrete/Reinforced_Concrete.jpg",
    ],

    download:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Components/Schiedel.rfa",

    description: "",
  },


  {
    id: "o1",
    title: "Jastrych",
    subtitle: "Jastrych cementowy",

    category: "Beton",
    subTags: ["Jastrych"],

    year: 1,

    thumbnail:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Materials/Concrete/Floor_Screed.jpg",

    images: [],

    download:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Components/Schiedel.rfa",

    description: "",
  },


  {
    id: "o12",
    title: "Beton C8/10",
    subtitle: "Chudy beton",

    category: "Beton",
    subTags: ["Beton podkładowy"],

    year: 1,

    thumbnail:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Materials/Concrete/Floor_Screed.jpg",

    images: [],

    download:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Components/Schiedel.rfa",

    description:
      "Chudy beton, warstwy podkładowe, pod fundamenty, podbudowy.",
  },


  {
    id: "o13",
    title: "Beton C12/15",
    subtitle: "Chudy beton",

    category: "Beton",
    subTags: ["Beton podkładowy"],

    year: 1,

    thumbnail:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Materials/Concrete/Floor_Screed.jpg",

    images: [],

    download:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Components/Schiedel.rfa",

    description:
      "Podkłady, fundamenty pod lekkie konstrukcje, elementy niezbrojone.",
  },


  {
    id: "o14",
    title: "Beton C16/20",
    subtitle: "Beton",

    category: "Beton",
    subTags: ["Beton konstrukcyjny"],

    year: 1,

    thumbnail:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Materials/Concrete/Floor_Screed.jpg",

    images: [],

    download:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Components/Schiedel.rfa",

    description:
      "Schody, tarasy, posadzki, lekkie fundamenty, elementy mało obciążone.",
  },


  {
    id: "o15",
    title: "Beton C20/25",
    subtitle: "Beton",

    category: "Beton",
    subTags: ["Beton konstrukcyjny"],

    year: 1,

    thumbnail:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Materials/Concrete/Floor_Screed.jpg",

    images: [],

    download:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Components/Schiedel.rfa",

    description:
      "Domy jednorodzinne, ławy fundamentowe, płyty fundamentowe, stropy, wieńce, słupy. Jedna z najczęściej stosowanych klas.",
  },


  {
    id: "o16",
    title: "Beton C25/30",
    subtitle: "Beton",

    category: "Beton",
    subTags: ["Beton konstrukcyjny"],

    year: 1,

    thumbnail:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Materials/Concrete/Floor_Screed.jpg",

    images: [],

    download:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Components/Schiedel.rfa",

    description:
      "Budynki wielorodzinne i przemysłowe, elementy konstrukcyjne o większych obciążeniach.",
  },


  // ==========================
  // IZOLACJE
  // ==========================


  {
    id: "k1",
    title: "Wełna",
    subtitle: "Wełna mineralna",

    category: "Izolacja",
    subTags: ["Wełna"],

    year: 1,

    thumbnail:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Materials/Insulation/Mineral_Wool.jpg",

    images: [],

    download:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Components/Schiedel.rfa",

    description: "",
  },


  {
    id: "k11x",
    title: "Styropian",
    subtitle: "Styropian EPS",

    category: "Izolacja",
    subTags: ["Styropian"],

    year: 1,

    thumbnail:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Materials/Insulation/Expanded_Polystyrene.jpg",

    images: [],

    download:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Components/Schiedel.rfa",

    description: "",
  },


  // ==========================
  // GRUNT
  // ==========================


  {
    id: "k2",
    title: "Grunt",
    subtitle: "Grunt rodzimy",

    category: "Grunt",
    subTags: ["Grunt"],

    year: 1,

    thumbnail:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Materials/Natural/Native_Soil.jpg",

    images: [],

    download:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Components/Schiedel.rfa",

    description: "",
  },


  {
    id: "k3",
    title: "Piasek",
    subtitle: "Piasek",

    category: "Grunt",
    subTags: ["Piasek"],

    year: 1,

    thumbnail:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Materials/Natural/Sand.jpg",

    images: [],

    download:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Components/Schiedel.rfa",

    description: "",
  },


  {
    id: "k4",
    title: "Piasek zagęszczony",
    subtitle: "Piasek zagęszczony",

    category: "Grunt",
    subTags: ["Piasek"],

    year: 1,

    thumbnail:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Materials/Natural/Sand_Bedding.jpg",

    images: [],

    download:
      "https://raw.githubusercontent.com/PafkoRoki/PAAS/main/public/Components/Schiedel.rfa",

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