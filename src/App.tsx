import { Fragment } from "react";
import Catalog from "./components/Catalog";
import Hero from "./components/Hero";
import StaggeredMenu, { type StaggeredMenuItem, type StaggeredMenuSocialItem } from "./components/StaggeredMenu";
import LanguageSwitch from "./components/LanguageSwitch";
import Footer from "./components/Footer";
import Iridescence from "./components/Iridescence";
import { assetUrl, libraries, materials } from "./catalog";
import { useLanguage } from "./i18n/useLanguage";
import "./App.css";

const socialItems: StaggeredMenuSocialItem[] = [
  { label: "Facebook", link: "https://pl-pl.facebook.com/Pafkoroki" },
  { label: "Instagram", link: "https://www.instagram.com/pafkoroki" },
  { label: "GitHub", link: "https://github.com/pafkoroki" },
];

function App() {
  const { t } = useLanguage();

  // Hash-only links keep ?lang= in the URL and don't reload the page.
  const menuItems: StaggeredMenuItem[] = [
    { label: t.nav.home, ariaLabel: t.nav.homeAria, link: "#home" },
    { label: t.nav.about, ariaLabel: t.nav.aboutAria, link: "#paas" },
    { label: t.nav.materials, ariaLabel: t.nav.materialsAria, link: "#materials" },
    { label: t.nav.libraries, ariaLabel: t.nav.librariesAria, link: "#libraries" },
    { label: t.nav.contact, ariaLabel: t.nav.contactAria, link: "#contact" },
    { label: "__________" },
  ];

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
          labels={t.menu}
          headerActions={<LanguageSwitch />}
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
    <h1>{t.about.heading}</h1>
<h2>P A A S</h2>

<h3>
  {t.about.paragraphs.map((paragraph, i) => (
    <Fragment key={i}>
      {i > 0 && <><br /><br /></>}
      {paragraph}
    </Fragment>
  ))}
</h3>

    <img
        src={assetUrl("site/docs.webp")}
        alt={t.about.imageAlt}
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
    <h1>{t.sections.libraries}</h1>
</section>
      <Catalog items={libraries} />

<section className="section" id="materials">
    <h1>{t.sections.materials}</h1>
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