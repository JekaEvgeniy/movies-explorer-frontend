import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import * as auth from '../../utils/Auth';

import headerLogo from '../../images/header/logo.svg';

/*
https://react-hook-form.com/
https://react-hook-form.com/docs/useform/register
*/

function Register({ ...props }) {
  const navigate = useNavigate();
  const [messageError, setMessageError] = useState(false);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    // mode: 'onBlur',
    mode: 'onChange',
  });

  const handleRegisterSubmit = (data) => {

    props.setIsVisibleLoader(true);

    auth
      // .register({ name, email, password })
      .register(data.name, data.email, data.password)
      .then((res) => {

        if (res.status !== 400) {
          auth
            .authorize(
              data.email,
              data.password
            )
            .then((res) => {
              if (res.token) {
                setMessageError(false);
                props.setLoggedIn(true);
                localStorage.setItem('jwt', res.token);
                // props.handleRegister();
                navigate('/movies', {replace: true}); // ТЗ: Если запрос успешен, пользователь сразу авторизуется и будет перенаправлен на страницу «Фильмы».
              }
            })
            .catch((err) => {
              console.log(`При регистрации пользователя произошла ошибка. ${err}`)
              setMessageError(true);
              props.setLoggedIn(false);
            })
            .finally(() => {
              props.setIsVisibleLoader(false);
            });
        }
      })
      .catch((err) => {
        setMessageError(true);
        console.log(`Пользователь с таким email уже существует. ${err}`)
      })
      .finally(() => {
        props.setIsVisibleLoader(false);
      });
  };

  return (
    <main className="content">
      <section className="authorization">
        <div className="authorization__container">
          <Link to="/" className="authorization__logo">
            <img className="image-contain" src={headerLogo} loading="lazy" alt="логотип" />
          </Link>

          <h1 className="authorization__header">Добро пожаловать!</h1>

          <form
            onSubmit={handleSubmit(handleRegisterSubmit)}
            className="authorization-form"
            name="registration"
          >
            <div className="authorization-form__content">
              <div className="authorization-form__content-top">
                <label className="authorization-form__label">
                  <span className="authorization-form__title">Имя</span>
                  <input
                    {...register('name', {
                      required: 'Поле обязательно к заполнению',
                      minLength: {
                        value: 2,
                        message: 'Минимум 2 символа',
                      },
                      maxLength: {
                        value: 30,
                        message: 'Максимум 30 символов'
                      },
                      onChange: (e) => {
                        setMessageError(false);
                      },
                    })}
                    type="text"
                    className={`authorization-form__input ${errors?.name ? 'authorization-form__input_invalid' : ''}`}
                    minLength="2"
                    maxLength="30"
                    placeholder="Введите имя"
                    required
                  />
                  <span className="authorization-form__error-message">
                    {errors?.name && (errors?.name?.message || "Пожалуйста, введите правильное имя")}
                  </span>
                </label>
                <label className="authorization-form__label">
                  <span className="authorization-form__title">E-mail</span>
                  <input
                    {...register("email", {
                      required: "Обязательно укажите e-mail",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Введите e-mail в формате example@gmail.com",
                      },
                      onChange: (e) => {
                        setMessageError(false);
                      },
                    })}
                    type="email"
                    inputMode="email"
                    className={`authorization-form__input ${errors?.email ? 'authorization-form__input_invalid' : ''}`}
                    placeholder="Введите email"
                    required
                  />
                  <span className="authorization-form__error-message">
                    {errors?.email && (errors?.email?.message || "Пожалуйста, введите правильно адрес электронной почты")}
                  </span>
                </label>
                <label className="authorization-form__label">
                  <span className="authorization-form__title">Пароль</span>
                  <input
                    {...register("password", {
                      required: "Поле обязательно для заполнения",
                      minLength: {
                        value: 4,
                        message: 'Минимум 4 символа',
                      },
                      maxLength: {
                        value: 30,
                        message: 'Максимум 30 символов'
                      },
                    })}
                    type="password"
                    className={`authorization-form__input ${errors?.password ? 'authorization-form__input_invalid' : ''}`}
                    placeholder="Введите пароль"
                    minLength="4"
                    maxLength="30"
                    required
                  />
                  <span className="authorization-form__error-message">
                    {errors?.password && (errors?.password?.message || "Пожалуйста, введите правильно пароль")}
                  </span>
                </label>

              </div>

              <div className="authorization-form__content-bottom">
                <div className="authorization-form-actions">
                  {messageError && (
                    <>
                      <p className="authorization-form-actions__error-message">При регистрации пользователя произошла ошибка.</p>
                    </>
                  )}

                  <button
                    type="submit"
                    className="authorization-form-actions__btn authorization-form-actions__btn_theme_accent"
                    disabled={!isValid}
                  >Зарегистрироваться</button>
                  <p className="authorization-form-actions__caption">
                    Уже зарегистрированы?
                    <Link className="authorization-form-actions__caption-link" to="/signin">Войти</Link>
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}

export default Register;
