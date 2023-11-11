import React, { useState, useEffect, useContext } from 'react';
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useForm, SubmitHandler } from "react-hook-form"
import * as auth from '../../utils/Auth';
import { api } from '../../utils/Api';
import { Link, useNavigate } from "react-router-dom";

function Profile({ ...props }) {
  const navigate = useNavigate();

  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [messageError, setMessageError] = useState(false);

  const [enabledEditMode, setEnableEditMode] = useState(true); // Внизу имеется кнопка для редактирования полей формы.
  // const [isVisibleButtonSave, setIsVisibleButtonSave] = useState(false);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    // mode: 'onBlur',
    mode: 'onChange',
  });

  useEffect(() => {
    if (currentUser.name) {
      // Без проверки можно получить: Cannot read properties of undefined (reading 'name')
      setName(currentUser.name);
    }

    if (currentUser.email) {
      setEmail(currentUser.email);
    }

  }, [currentUser, email, name, isValid, enabledEditMode]);

  function handleInputChangeName(e) {
    setName(e.target.value);
  }

  function handleInputChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleBtnEdit(){
    setEnableEditMode(false);
  }

  const handleProfileUpdate = (userData) => {

    props.setIsVisibleLoader(true);
    api
      .setUserInfo(userData)
      .then((updateUserData) => {
        props.setCurrentUser(updateUserData.data);
        setMessageError(false);
        setEnableEditMode(true);
        // closeAllPopups();
      })
      .catch(err => {
        console.error(err);
        setMessageError(true);
      })
      .finally(() => {
        props.setIsVisibleLoader(false);
      });
  };


  return (
    <section className="profile" aria-label="Личный кабинет">
      <div className="profile__container">
        <h1 className="profile__header">Привет, {currentUser.name}!</h1>

        <form
          onSubmit={handleSubmit(handleProfileUpdate)}
          className="profile-form"
          name="profile"
        >
          <div className="profile-form__content">
            <div className="profile-form__content-top">
              <label className="profile-form__label">
                <span className="profile-form__title">Имя</span>
                <input
                  {...register('name', {
                    disabled: enabledEditMode ? true : false,
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
                      handleInputChangeName(e);
                    },
                  })}
                  type="text"
                  className={`profile-form__input ${errors?.name ? 'profile-form__input_invalid' : ''}`}
                  name="name"
                  defaultValue={currentUser.name}
                />
              </label>

              <span className="profile-form__error-message">
                {errors?.name && (errors?.name?.message || "Пожалуйста, введите правильное имя")}
              </span>


              <label className="profile-form__label">
                <span className="profile-form__title">E-mail</span>
                <input
                  {...register("email", {
                    disabled: enabledEditMode ? true : false,
                    required: "Обязательно укажите e-mail",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Введите e-mail в формате example@gmail.com",
                    },
                    onChange: (e) => {
                      handleInputChangeEmail(e);
                    },
                  })}
                  type="email"
                  inputMode="email"
                  className="profile-form__input"
                  name="email"
                  defaultValue={email}
                />
              </label>

              <span className="profile-form__error-message">
                {errors?.email && (errors?.email?.message || "Пожалуйста, введите правильно адрес электронной почты")}
              </span>

            </div>
            <div className="profile-form__content-bottom">
              <div className="profile-form-actions">
                {messageError && (
                  <p className="profile-form-actions__error-message">При обновлении профиля произошла ошибка.</p>
                )}
                {
                 enabledEditMode ? (
                  <>
                    <button
                      onClick={handleBtnEdit}
                      type="button"
                      className="profile-form-actions__btn profile-form-actions__btn_type_edit"
                    >Редактировать</button>
                    <button
                      onClick={props.handleLogout}
                      type="button"
                      className="profile-form-actions__btn profile-form-actions__btn_type_exit"
                    >Выйти из аккаунта</button>
                  </>
                  ) : (
                    <button type="submit"
                      disabled={!isValid}
                      className="profile-form-actions__btn profile-form-actions__btn_theme_accent">Сохранить</button>
                  )
                }


              </div>
            </div>
          </div>
        </form>
      </div>
    </section>

  );
}

export default Profile;

