import Catalog from "./components/catalog/Catalog";
import StaggeredMenu, { type StaggeredMenuItem, type StaggeredMenuSocialItem } from "./components/StaggeredMenu";
import LanguageSwitch from "./components/LanguageSwitch";
import Footer from "./components/Footer";
import Iridescence from "./components/Iridescence";
import { items } from "./catalog";
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
    { label: t.nav.library, ariaLabel: t.nav.libraryAria, link: "#library" },
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
            accentColor="#176bff"
            labels={t.menu}
            headerActions={<LanguageSwitch />}
          />
        </header>

        <div className="background-title">
          <Iridescence color={[1, 1, 1]} mouseReact={true} amplitude={0.1} speed={0.5} />
        </div>

        <section className="section section--library" id="library">
          <header className="section-header">
            <h1>{t.library.heading}</h1>
            <p className="section-header__intro">{t.library.intro}</p>
          </header>
        </section>
        <Catalog items={items} title="P A A S" />
      </div>

      <footer className="footer" id="contact">
        <Footer />
      </footer>
    </>
  );
}

export default App;
