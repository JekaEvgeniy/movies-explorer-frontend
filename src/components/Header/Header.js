import React from 'react';
import { Link } from "react-router-dom";
import { useState } from 'react';

import Navigation from "../Navigation/Navigation";

import HeaderBurger from '../HeaderBurger/HeaderBurger';
import HeaderProfileNav from '../HeaderProfileNav/HeaderProfileNav';

import headerLogo from '../../images/header/logo.svg'

function Header({ ...props }) {

  const [isMenuOpened, setIsMenuOpened] = useState(false);

  // console.log(`props.isPageMovies || props.isPageProfile = ${props.isPageMovies || props.isPageProfile}`);

  return (
    <header className="header header_theme_blue" data-example={props.loggedIn}>
      <Link to="/" className="header__logo">
        <img className="image-contain" src={headerLogo} loading="lazy" alt="логотип" />
      </Link>

      {
        props.loggedIn ? (
          <>
            <HeaderBurger
              isPageIndex={props.isPageIndex}
              setIsMenuOpened={setIsMenuOpened}
            />
            <HeaderProfileNav
              isPageIndex={props.isPageIndex}
              isOpen={isMenuOpened}
              setIsMenuOpened={setIsMenuOpened}
            />
          </>

        ) : (
          props.isPageIndex ? (
            <Navigation />
          ):(
            ''
          )
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
