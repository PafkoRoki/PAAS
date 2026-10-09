import { assetUrl } from "../catalog";
import { useLanguage } from "../i18n/useLanguage";
import "./Footer.css";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="logo">
            <img 
              src={assetUrl("site/logo.svg")} 
              alt="Untitled UI logo" 
              className="logo-icon" 
            />
          </div>
        </div>

        <div className="footer-columns">

          <div className="footer-col">
            <h4>C O N T .</h4>
            <ul>
            <li>
              <a href="tel:+48509964289" aria-label={t.footer.callAria} className="footer-link">509 000 289</a>
            </li>
            <li>
              <a href="mailto:pafko.roki@gmail.com" aria-label={t.footer.emailAria} className="footer-link">paas@gmail.com</a>
            </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>T E C H</h4>
            <ul>
            <li>
              <a href="https://reactbits.dev/" aria-label="Reactbits" className="footer-link">React Bits</a>
            </li>
            <li>
              <a href="https://www.autodesk.com/pl/products/revit-lt/" aria-label="Threejs" className="footer-link"> Revit</a>
            </li>
            </ul>
          </div>      
          <div className="footer-col">
            <h4>F O N T S</h4>
            <ul>
            <li>
              <a href="https://fonts.google.com/specimen/TASA+Orbiter" aria-label="TASA Orbiter" className="footer-link" style={{ fontFamily: "'TASA Orbiter'" }}>TASA Orbiter</a>
            </li>
            <li>
              <a href="https://www.dafont.com/boyrun.font" aria-label="Boyrun" className="footer-link" style={{ fontFamily: "'Boyrun'" }}>B O Y R U N</a>
            </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>S O C I A L</h4>
            <ul>
            <li>
              <a href="https://www.instagram.com/pafkoroki/" aria-label="Instagram" className="footer-link">Instagram</a>
            </li>
            <li>
              <a href="https://www.behance.net/pawerokicki/projects" aria-label="Behance" className="footer-link">Behance</a>
            </li>
            </ul>
          </div>


        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 P A A S</p>
        <div className="social-icons">
    <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
      <img src={assetUrl("site/icons/instagram.svg")} alt="Instagram" />
    </a>
    <a href="https://linkedin.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
      <img src={assetUrl("site/icons/facebook.svg")} alt="Facebook" />
    </a>
    <a href="https://facebook.com" aria-label="Strava" target="_blank" rel="noopener noreferrer">
      <img src={assetUrl("site/icons/strava.svg")} alt="Strava" />
    </a>
    <a href="https://github.com/RestDayBlamage" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
      <img src={assetUrl("site/icons/github.svg")} alt="Github" />
    </a>
    <a href="https://www.behance.net/pawerokicki" aria-label="Behance" target="_blank" rel="noopener noreferrer">
      <img src={assetUrl("site/icons/behance.svg")} alt="Behance" />
    </a>
        </div>
      </div>
    </footer>
  );
}
