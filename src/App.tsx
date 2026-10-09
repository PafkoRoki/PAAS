import Catalog from "./components/Catalog";
import Hero from "./components/Hero";
import StaggeredMenu, { type StaggeredMenuItem, type StaggeredMenuSocialItem } from "./components/StaggeredMenu";
import Footer from "./components/Footer";
import Iridescence from "./components/Iridescence";
import { assetUrl, libraries, materials } from "./catalog";
import "./App.css";

const menuItems: StaggeredMenuItem[] = [
  { label: "HOME", ariaLabel: "Go to home page", link: "/PAAS/#home" },
  { label: "ABOUT", ariaLabel: "About", link: "/PAAS/#paas" },
  { label: "MATERIAŁY", ariaLabel: "View our materials", link: "/PAAS/#materials" },
  { label: "BIBLIOTEKI", ariaLabel: "View our libraries", link: "/PAAS/#libraries" },
  { label: "KONTAKT", ariaLabel: "View our trips", link: "/PAAS/#contact" },
  { label: "__________" },
];

const socialItems: StaggeredMenuSocialItem[] = [
  { label: "Facebook", link: "https://pl-pl.facebook.com/Pafkoroki" },
  { label: "Instagram", link: "https://www.instagram.com/pafkoroki" },
  { label: "GitHub", link: "https://github.com/pafkoroki" },
];

function App() {
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
          colors={["#f0f0f0", "#f0f0f0", "#176bff"]}
          logoUrl={assetUrl("site/logo.svg")}
          accentColor="#176bff"
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


<section className="hero-section" id="home">
      <Hero />
      
</section>

<section className="section" id="paas">
    <h1>O PROJEKCIE</h1>
<h2>P A A S</h2>

<h3>
Projekt rozwijający biblioteki i zasoby dla programu Autodesk Revit, dostosowane do polskich standardów projektowania oraz dokumentacji technicznej i budowlanej. Jego celem jest ułatwienie pracy architektów i projektantów poprzez dostarczenie gotowych komponentów zgodnych z krajowymi wymaganiami i dobrymi praktykami.<br/><br/>

Dzięki P A A S użytkownicy mogą korzystać z bibliotek usprawniających tworzenie dokumentacji projektowej, zachowując zgodność z polskimi normami i standardami rysunku technicznego. Projekt wspiera efektywniejszą pracę w środowisku BIM, ogranicza konieczność ręcznego dostosowywania elementów oraz przyspiesza przygotowanie dokumentacji.
</h3>

    <img
        src={assetUrl("site/docs.webp")}
        alt="Przykładowa dokumentacja wykonana z bibliotekami P A A S"
        loading="lazy"
    style={{
        width: "100%",
        maxWidth: "1200px",
        height: "auto",
        display: "block",
        margin: "0 auto",
        filter: "drop-shadow(0 5px 5px #2d2d2dcf)",
    }}
    />
</section>

<section className="section" id="libraries">
    <h1>BIBLIOTEKI</h1>
</section>
      <Catalog items={libraries} />

<section className="section" id="materials">
    <h1>MATERIAŁY</h1>
</section>
      <Catalog items={materials} />

<section className="section" id="about">
          <h1>Software & Tools</h1>
          <h3>
          Revit
          </h3>
          <h2>xyz</h2>



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

    </div>

      <footer className="footer" id="contact">
          <Footer />
      </footer>
    </>
  );
}

export default App;