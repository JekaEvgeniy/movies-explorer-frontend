import React from 'react';
import { Link } from "react-router-dom";
import { useState } from 'react';

import Navigation from "../Navigation/Navigation";

import HeaderBurger from '../HeaderBurger/HeaderBurger';
import HeaderProfileNav from '../HeaderProfileNav/HeaderProfileNav';

import headerLogo from '../../images/header/logo.svg'

function Header({ ...props }) {

  const [isMenuOpened, setIsMenuOpened] = useState(false);

  return (
    <header className="header header_theme_blue">
      <Link to="/" className="header__logo">
        <img className="image-contain" src={headerLogo} loading="lazy" alt="логотип" />
      </Link>

      {
        props.isPageIndex && (
          <Navigation />
        )
      }

      {
       (props.isPageMovies || props.isPageProfile) && (
          <>
            <HeaderBurger setIsMenuOpened={setIsMenuOpened} />
            <HeaderProfileNav isOpen={isMenuOpened} setIsMenuOpened={setIsMenuOpened}  />
          </>
        )
      }
    </header>
  )
}

export default Header;
