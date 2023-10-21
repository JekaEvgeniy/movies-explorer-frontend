import React from "react";

function Footer(){
  return (
    <footer className="footer">
      <h2 className="footer__header">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className="footer__inside">
        <p className="footer__copyright">&copy; 2020</p>

        <div className="footer-actions">
          <ul className="footer-actions-items">
            <li className="footer-actions-items__item">
              <a href="https://practicum.yandex.ru/" className="footer-actions__link" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
            </li>
            <li className="footer-actions-items__item">
              <a href="https://github.com/JekaEvgeniy/" className="footer-actions__link" target="_blank" rel="noreferrer">Github</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
