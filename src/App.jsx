import React, { useState } from 'react';
import ProjectTile from "./components/ProjectTile";
import Hero from "./components/Hero";
import StaggeredMenu from './components/StaggeredMenu';
import Footer from "./components/Footer";
import MetaBalls from './components/MetaBalls';
import LogoLoop from './components/LogoLoop';
import Iridescence from './components/Iridescence';
import Carousel from './components/Carousel';
import './App.css';

function App() {

  const menuItems = [
    { label: 'O MNIE', ariaLabel: 'Go to home page', link: '/APR/#about' },
    { label: 'PORTFOLIO', ariaLabel: 'Learn about us', link: '/APR/#portfolio' },
    { label: 'KONTAKT', ariaLabel: 'View our trips', link: '/APR/#contact' },
    { label: "__________"},
    { label: "509 964 289", ariaLabel: "Call me",  link: "tel:+48509947289" },
    { label: "534 498 293", ariaLabel: "Call me",  link: "tel:+48534498293" },
    { label: "Priv. email", ariaLabel: "Email me", link: "mailto:pafko.roki@gmail.com" },
    { label: "Stud. email", ariaLabel: "Email me", link: "mailto:pawel.rokicki@student.put.poznan.pl" }
  ];

  const socialItems = [
    { label: 'Facebook', link: 'https://pl-pl.facebook.com/Pafkoroki' },
    { label: 'Instagram', link: 'https://www.instagram.com/pafkoroki' },
    { label: 'Strava', link: 'https://www.strava.com/athletes/34214799' },
    { label: 'GitHub', link: 'https://github.com/RestDayBlamage' }
  ];

  const techLogos = [
    { src: "https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/icons/revit.svg", alt: "revit", href: "https://www.autodesk.com/pl/products/revit/overview" },
    { src: "https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/icons/autocad.svg", alt: "autocad", href: "https://www.autodesk.com/pl/products/autocad/overview" },
    { src: "https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/icons/sketchup.svg", alt: "sketchup", href: "https://sketchup.com." },
    { src: "https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/icons/d5render.svg", alt: "d5render", href: "https://www.d5render.com/" },
    { src: "https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/icons/vite.svg", alt: "vite", href: "https://vite.dev/" },
    { src: "https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/icons/github.svg", alt: "github", href: "https://github.com/RestDayBlamage" },
    { src: "https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/icons/react.svg", alt: "react", href: "https://react.dev/" },
    { src: "https://static.sketchfab.com/img/press/logos/sketchfab-logo.svg", alt: "sketchfab", href: "https://sketchfab.com/feed" },
  ];


  const [openIndex, setOpenIndex] = useState(null);

  const toggleMenu = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>

<div className="App">

      <header className="header">
        <StaggeredMenu
          position="right"
          items={menuItems}
          socialItems={socialItems}
          displaySocials={true}
          displayItemNumbering={true}
          menuButtonColor="#1F2026"
          openMenuButtonColor="#1F2026"
          changeMenuColorOnOpen={true}
          colors={["#E8EBF7", "#E8EBF7", "#E8EBF7"]}
          logoUrl="https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/logo 2.svg"
          accentColor="#8AA0FF"
          onMenuOpen={() => console.log('Menu opened')}
          onMenuClose={() => console.log('Menu closed')}
        />
      </header>

<div className="background-title">
<Iridescence
  color={[1, 1, 1]}
  mouseReact={true}
  amplitude={0.1}
  speed={0.5}
/>
</div>

<section className="hero-section">
      <Hero />
</section>


<section className="section" id="portfolio">
    <h1>BIBLIOTEKI</h1>
</section>
      <ProjectTile />

<section className="section" id="about">
          <h1>O MNIE</h1>
          <h3>
          Nazywam się <span style={{ fontWeight: 700 }}>Paweł</span> i szczególną przyjemność sprawia mi praca w programie <span style={{ fontWeight: 700 }}>Revit</span>.
          </h3>
          <h2>Software & Tools</h2>



          {/*<div class="sketchfab-embed-wrapper"> 
            <iframe 
            title="Sports Hall" 
            frameborder="0" 
            allowfullscreen mozallowfullscreen="true" 
            webkitallowfullscreen="true" allow="autoplay; fullscreen; xr-spatial-tracking" 
            xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share src="https://sketchfab.com/models/0231965a188b43869624ab1573776d68/embed?autospin=0&autostart=0&preload=0&transparent=1"> 
            </iframe> 
          </div>*/}
</section>

<Carousel />

    </div>

      <footer className="footer" id="contact">
          <Footer />
      </footer>
    </>
  );
}

export default App;