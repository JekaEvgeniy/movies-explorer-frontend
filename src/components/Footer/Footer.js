import React from "react";

function Footer(){
  return (
    <footer class="footer">
      <h2 class="footer__header">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div class="footer__inside">
        <p class="footer__copyright">&copy; 2020</p>

        <div class="footer-actions">
          <ul class="footer-actions-items">
            <li class="footer-actions-items__item">
              <a href="https://practicum.yandex.ru/" class="footer-actions__link" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
            </li>
            <li class="footer-actions-items__item">
              <a href="https://github.com/JekaEvgeniy/" class="footer-actions__link" target="_blank" rel="noreferrer">Github</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
