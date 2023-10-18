import React from 'react';
import { Link } from "react-router-dom";



function Navigation() {
  return (
    <div className="header-actions">
      <Link className="header-actions__link header-actions__link_type_text" to="/signup">Регистрация</Link>
      <Link className="header-actions__link header-actions__link_type_btn" to="/signin">Войти</Link>
    </div>
  )
}

export default Navigation;
