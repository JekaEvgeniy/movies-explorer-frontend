import React from "react";
import Sprite from '../../images/common/sprite.svg';

function Portfolio(){
  return (
    <section className="portfolio">
      <h2 className="portfolio__section-header">Портфолио</h2>

      <ul className="portfolio-items">
        <li className="portfolio-items__item">
          <a href="https://jekaevgeniy.github.io/russian-travel/index.html" className="portfolio__link" target="_blank" rel="noreferrer">
            <span className="portfolio__link-title">Статичный сайт</span>
            <span className="portfolio__link-ico">
              <svg aria-hidden="true" className="image-contain" xmlns="http://www.w3.org/2000/svg">
                <use href={`${Sprite}#portfolio-arrow`}></use>
              </svg>
            </span>
          </a>
        </li>
        <li className="portfolio-items__item">
          <a href="https://jekaevgeniy.github.io/russian-travel/index.html" className="portfolio__link" target="_blank" rel="noreferrer">
            <span className="portfolio__link-title">Адаптивный сайт</span>
            <span className="portfolio__link-ico">
              <svg aria-hidden="true" className="image-contain" xmlns="http://www.w3.org/2000/svg">
                <use href={`${Sprite}#portfolio-arrow`}></use>
              </svg>
            </span>
          </a>
        </li>
        <li className="portfolio-items__item">
          <a href="https://jekaevgeniy.github.io/mesto/index.html" className="portfolio__link" target="_blank" rel="noreferrer">
            <span className="portfolio__link-title">Одностраничное приложение</span>
            <span className="portfolio__link-ico">
              <svg aria-hidden="true" className="image-contain" xmlns="http://www.w3.org/2000/svg">
                <use href={`${Sprite}#portfolio-arrow`}></use>
              </svg>
            </span>
          </a>
        </li>
      </ul>
    </section>
  );
}
export default Portfolio;
