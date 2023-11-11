import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import * as auth from '../../utils/Auth';

import headerLogo from '../../images/header/logo.svg';

function Login({...props}) {
  const navigate = useNavigate();

  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  });

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    // mode: 'onBlur',
    mode: 'onChange',
  });

  const handleLoginSubmit = (data) => {
    props.setIsVisibleLoader(true);

    auth
      .authorize(data.email, data.password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          props.handleLogin();
          navigate('/');
        }
      })
      .catch((err) => console.log("Ошибка", err))
      .finally(() => {
        props.setIsVisibleLoader(false);
      });
  };

  // const handleLoginSubmit = (e) => {
  //   e.preventDefault();
  //   const { email, password } = formValue;
  //   auth.authorize({ email, password })
  //     .then(data => {

  //       if (data.token) {
  //         localStorage.setItem('jwt', data.token);
  //         // api.setToken(data.token);

  //         handleLogin();

  //         navigate('/');
  //       }

  //     })
  //     .catch((err) => {
  //       // console.error(err);
  //       handleInfoTooltip('error');
  //     });
  // }


  return (
      <section className="authorization">
        <div className="authorization__container">
          <Link to="/" className="authorization__logo">
            <img className="image-contain" src={headerLogo} loading="lazy" alt="логотип" />
          </Link>

          <h1 className="authorization__header">Рады видеть!</h1>

          <form
            onSubmit={handleSubmit(handleLoginSubmit)}
            className="authorization-form"
            name="authorization"
          >
            <div className="authorization-form__content">
              <div className="authorization-form__content-top">
                <label className="authorization-form__label">
                  <span className="authorization-form__title">E-mail</span>
                  <input
                    {...register("email", {
                      required: "Поле email обязательно для заполнения",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Введите e-mail в формате example@gmail.com",
                      },
                      onChange: (e) => {
                        const { name, value } = e.target;

                        setFormValue({
                          ...formValue,
                          [name]: value
                        });
                      },
                    })}
                    type="email"
                    inputMode="email"
                    className={`authorization-form__input ${errors?.email ? 'authorization-form__input_invalid' : ''}`}
                    placeholder="Введите email"
                    required
                  />
                  <span className="authorization-form__error-message">
                    {errors?.email && ( errors?.email?.message || "Пожалуйста, введите правильно адрес электронной почты")}
                  </span>
                </label>
                <label className="authorization-form__label">
                  <span className="authorization-form__title">Пароль</span>
                  <input
                    {...register("password", {
                      required: 'Поле обязательно к заполнению',
                      minLength: {
                        value: 4,
                        message: 'Минимум 4 символа',
                      },
                      maxLength: {
                        value: 30,
                        message: 'Максимум 30 символов'
                      },
                      onChange: (e) => {
                        const { name, value } = e.target;

                        setFormValue({
                          ...formValue,
                          [name]: value
                        });
                      },
                    })}
                    type="password"
                    className="authorization-form__input"
                    placeholder="Введите пароль"
                    required
                    minLength="4"
                    maxLength="30"
                  />
                  <span className="authorization-form__error-message">
                    {errors?.password && ( errors?.password?.message || "Ошибка при заполнении пароля" )}
                  </span>
                </label>

              </div>

              <div className="authorization-form__content-bottom">
                <div className="authorization-form-actions">
                  <button
                    type="submit"
                    className="authorization-form-actions__btn authorization-form-actions__btn_theme_accent"
                    disabled={!isValid}
                  >Войти</button>
                  <p className="authorization-form-actions__caption">
                    Ещё не зарегистрированы? <Link className="authorization-form-actions__caption-link" to="/signup">Регистрация</Link>
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
