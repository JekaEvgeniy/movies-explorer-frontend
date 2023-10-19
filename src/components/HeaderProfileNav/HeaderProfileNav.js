import React from "react";
import { Link, NavLink } from "react-router-dom";
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
          <NavLink to="/"
            className="header-profile-nav__link"
            activeClassName="active"
            onClick={() => setIsMenuOpened(false)}>Главная</NavLink>
        </li>

        <li className="header-profile-nav-items__item">
          <NavLink to="/movies"
            className={({ isActive }) => isActive ? "header-profile-nav__link header-profile-nav__link_active" : "header-profile-nav__link"}
            onClick={() => setIsMenuOpened(false)}>Фильмы</NavLink>
        </li>
        <li className="header-profile-nav-items__item">
          <NavLink to="/saved-movies"
            className={({ isActive }) => isActive ? "header-profile-nav__link header-profile-nav__link_active" : "header-profile-nav__link"}
            onClick={() => setIsMenuOpened(false)}>Сохранённые фильмы</NavLink>
        </li>
        <li className="header-profile-nav-items__item header-profile-nav-items__item_pos-right">
          <NavLink  to="/profile"
            className="header-profile-nav__link header-profile-nav__link_type-profile"
            onClick={() => setIsMenuOpened(false)}>
            Аккаунт
            <span className="header-profile-nav__link-ico">
              <svg className="image-contain" xmlns="http://www.w3.org/2000/svg">
                <use href={`${Sprite}#ico-profile`}></use>
              </svg>
            </span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default HeaderProfileNav;
