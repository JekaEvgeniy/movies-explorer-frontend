import React from 'react';
import { Link } from "react-router-dom";

import headerLogo from '../../images/header/logo.svg';

function Register() {
  return (
    <section className="authorization">
      <div className="authorization__container">
        <Link to="/" className="authorization__logo">
          <img className="image-contain" src={headerLogo} loading="lazy" alt="логотип" />
        </Link>

        <h1 className="authorization__header">Добро пожаловать!</h1>

        <form className="authorization-form">
          <div className="authorization-form__content">
            <div className="authorization-form__content-top">
              <label className="authorization-form__label">
                <span className="authorization-form__title">Имя</span>
                <input type="text" className="authorization-form__input" minlength="2" maxlength="30" placeholder="Введите имя" required />
                <span className="authorization-form__error-message"></span>
              </label>
              <label className="authorization-form__label">
                <span className="authorization-form__title">E-mail</span>
                <input type="email" inputmode="email" className="authorization-form__input" placeholder="Введите email" required />
                <span className="authorization-form__error-message"></span>
              </label>
              <label className="authorization-form__label">
                <span className="authorization-form__title">Пароль</span>
                <input type="password" className="authorization-form__input authorization-form__input_invalid" placeholder="Введите пароль" required />
                <span className="authorization-form__error-message">Что-то пошло не так...</span>
              </label>

            </div>

            <div className="authorization-form__content-bottom">
              <div className="authorization-form-actions">
                <p className="authorization-form-actions__error-message"></p>
                <button type="button" className="authorization-form-actions__btn authorization-form-actions__btn_orange">Зарегистрироваться</button>
                <p className="authorization-form-actions__caption">
                  Уже зарегистрированы? <a className="authorization-form-actions__caption-link" href="/signin">Войти</a>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Register;
