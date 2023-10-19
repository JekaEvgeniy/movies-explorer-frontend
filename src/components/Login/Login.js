import React from 'react';
import { Link } from "react-router-dom";

import headerLogo from '../../images/header/logo.svg';

function Login() {
  return (

    <section className="authorization">
      <div className="authorization__container">
        <Link to="/" className="authorization__logo">
          <img className="image-contain" src={headerLogo} loading="lazy" alt="логотип" />
        </Link>

        <h1 className="authorization__header">Рады видеть!</h1>

        <form className="authorization-form">
          <div className="authorization-form__content">
            <div className="authorization-form__content-top">
              <label className="authorization-form__label">
                <span className="authorization-form__title">E-mail</span>
                <input type="email" inputMode="email" className="authorization-form__input" placeholder="Введите email" required />
                  <span className="authorization-form__error-message"></span>
              </label>
              <label className="authorization-form__label">
                <span className="authorization-form__title">Пароль</span>
                <input type="password" className="authorization-form__input" placeholder="Введите пароль" required />
                  <span className="authorization-form__error-message"></span>
              </label>

            </div>

            <div className="authorization-form__content-bottom">
              <div className="authorization-form-actions">
                <p className="authorization-form-actions__error-message"></p>
                <button type="button" className="authorization-form-actions__btn authorization-form-actions__btn_orange">Войти</button>
                <p className="authorization-form-actions__caption">
                  Ещё не зарегистрированы? <a className="authorization-form-actions__caption-link" href="/signup">Регистрация</a>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>

  );
}

export default Login;
