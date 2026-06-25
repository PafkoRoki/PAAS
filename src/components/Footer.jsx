import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="logo">
            <img 
              src="https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/Logo.png" 
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
              <a href="tel:+48509964289" aria-label="Call me" className="footer-link">509 964 289</a>
            </li>
            <li>
              <a href="tel:+4853449829" aria-label="Call me" className="footer-link">534 498 293</a>
            </li>
            <li>
              <a href="mailto:pawel.rokicki@student.put.poznan.pl" aria-label="Email me" className="footer-link">Private email</a>
            </li>
            <li>
              <a href="mailto:pawel.rokicki@student.put.poznan.pl" aria-label="Email me" className="footer-link">Student email</a>
            </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>T E C H</h4>
            <ul>
            <li>
              <a href="https://react.dev/" aria-label="React" className="footer-link">React</a>
            </li>
            <li>
              <a href="https://reactbits.dev/" aria-label="Reactbits" className="footer-link">React Bits</a>
            </li>
            <li>
              <a href="https://vite.dev/" aria-label="Vite" className="footer-link">Vite</a>
            </li>
            <li>
              <a href="https://threejs.org/" aria-label="Threejs" className="footer-link"> Three.js</a>
            </li>
            </ul>
          </div>      
          <div className="footer-col">
            <h4>F O N T S</h4>
            <ul>
            <li>
              <a href="https://www.dafont.com/boeotia.font" aria-label="Boeotia" className="footer-link" style={{ fontFamily: "'Boeotia'" }}>Boeotia</a>
            </li>
            <li>
              <a href="https://www.1001fonts.com/bestie-seventy-font.html" aria-label="Bestie Seventy" className="footer-link" style={{ fontFamily: "'Bestie Seventy'" }}>Bestie Seventy</a>
            </li>
            <li>
              <a href="https://fontm.com/popstar-font/" aria-label="Popstar" className="footer-link" style={{ fontFamily: "'Popstar'" }}>Popstar</a>
            </li>
            <li>
              <a href="https://www.dafont.com/boyrun.font" aria-label="Boyrun" className="footer-link" style={{ fontFamily: "'Boyrun'" }}>Boyrun</a>
            </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>S O C I A L</h4>
            <ul>
            <li>
              <a href="mailto:pawel.rokicki@student.put.poznan.pl" aria-label="Email me" className="footer-link">Instagram</a>
            </li>
            <li>
              <a href="mailto:pawel.rokicki@student.put.poznan.pl" aria-label="Email me" className="footer-link">Facebook</a>
            </li>
            <li>
              <a href="mailto:pawel.rokicki@student.put.poznan.pl" aria-label="Email me" className="footer-link">Behance</a>
            </li>
            <li>
              <a href="mailto:pawel.rokicki@student.put.poznan.pl" aria-label="Email me" className="footer-link">GitHub</a>
            </li>
            </ul>
          </div>


        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Paweł Rokicki</p>
        <div className="social-icons">
    <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
      <img src="https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/instagram.svg" alt="Instagram" />
    </a>
    <a href="https://linkedin.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
      <img src="https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/facebook.svg" alt="Facebook" />
    </a>
    <a href="https://facebook.com" aria-label="Strava" target="_blank" rel="noopener noreferrer">
      <img src="https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/strava.svg" alt="Strava" />
    </a>
    <a href="https://github.com" aria-label="Komoot" target="_blank" rel="noopener noreferrer">
      <img src="https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/komoot.svg" alt="Komoot" />
    </a>
    <a href="https://github.com/RestDayBlamage" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
      <img src="https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/github.svg" alt="Github" />
    </a>
    <a href="https://www.behance.net/pawerokicki" aria-label="Behance" target="_blank" rel="noopener noreferrer">
      <img src="https://raw.githubusercontent.com/RestDayBlamage/APR/main/public/behance.svg" alt="Behance" />
    </a>
        </div>
      </div>
    </footer>
  );
}
