import React from 'react';

import headerLogo from '../../images/header/logo.svg'

function Header() {
  return (
    <header className="header header_theme_blue">
      <a href="index.html" className="header__logo">
        <img className="image-contain" src={headerLogo} loading="lazy" alt="логотип" />
      </a>
      <div className="header-actions">
        <a className="header-actions__link header-actions__link_type_text" href="/signup">Регистрация</a>
        <a className="header-actions__link header-actions__link_type_btn" href="/signin">Войти</a>
      </div>
    </header>
  )
}

export default Header;
