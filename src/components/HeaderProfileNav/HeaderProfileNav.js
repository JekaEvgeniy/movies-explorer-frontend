import React from "react";
import { Link } from "react-router-dom";
import Sprite from '../../images/common/sprite.svg';

function HeaderProfileNav(){
  return (
    <nav className="header-profile-nav">
      <button className="header-profile-nav__button-close" type="button" aria-label="Закрыть мобильное меню">
        <svg className="image-contain" xmlns="http://www.w3.org/2000/svg">
          <use href={`${Sprite}#header-profile-nav-button-close`}></use>
        </svg>
      </button>
      <ul className="header-profile-nav-items">
        <li className="header-profile-nav-items__item header-profile-nav-items__item_hidden-desktop">
          <Link to="/" className="header-profile-nav__link">Главная</Link>
        </li>

        <li className="header-profile-nav-items__item">
          <Link to="/movies" className="header-profile-nav__link header-profile-nav__link_active">Фильмы</Link>
        </li>
        <li className="header-profile-nav-items__item">
          <Link to="/saved-movies" className="header-profile-nav__link">Сохранённые фильмы</Link>
        </li>
        <li className="header-profile-nav-items__item header-profile-nav-items__item_pos-right">
          <Link to="/profile" className="header-profile-nav__link header-profile-nav__link_type-profile">
            Аккаунт
            <span className="header-profile-nav__link-ico">
              <svg className="image-contain" xmlns="http://www.w3.org/2000/svg">
                <use href={`${Sprite}#ico-profile`}></use>
              </svg>
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default HeaderProfileNav;
