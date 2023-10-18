import React from 'react';
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";


import headerLogo from '../../images/header/logo.svg'

function Header() {
  return (
    <header className="header header_theme_blue">
      <Link to="/" className="header__logo">
        <img className="image-contain" src={headerLogo} loading="lazy" alt="логотип" />
      </Link>
      <Navigation />
    </header>
  )
}

export default Header;
