import React from "react";
import { Link } from "react-router-dom";
import Sprite from '../../images/common/sprite.svg';

function HeaderProfileNav({ isOpen, setIsMenuOpened }){

  return (
    <nav className={`header-profile-nav ${isOpen ? 'header-profile-nav_active' : ''}`}>
      <button className="header-profile-nav__button-close" onClick={() => setIsMenuOpened(false)}  type="button" aria-label="Закрыть мобильное меню">
        <svg className="image-contain" xmlns="http://www.w3.org/2000/svg">
          <use href={`${Sprite}#header-profile-nav-button-close`}></use>
        </svg>
      </button>
      <ul className="header-profile-nav-items">
        <li className="header-profile-nav-items__item header-profile-nav-items__item_hidden-desktop">
          <Link to="/" className="header-profile-nav__link"
            onClick={() => setIsMenuOpened(false)}>Главная</Link>
        </li>

        <li className="header-profile-nav-items__item">
          <Link to="/movies" className="header-profile-nav__link header-profile-nav__link_active"
            onClick={() => setIsMenuOpened(false)}>Фильмы</Link>
        </li>
        <li className="header-profile-nav-items__item">
          <Link to="/saved-movies" className="header-profile-nav__link"
            onClick={() => setIsMenuOpened(false)}>Сохранённые фильмы</Link>
        </li>
        <li className="header-profile-nav-items__item header-profile-nav-items__item_pos-right">
          <Link to="/profile" className="header-profile-nav__link header-profile-nav__link_type-profile"
            onClick={() => setIsMenuOpened(false)}>
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
