import React, { useState, useEffect, useContext } from 'react';
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useForm } from "react-hook-form"
import { api } from '../../utils/Api';

function Profile({ ...props }) {

  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [messageError, setMessageError] = useState(false);

  const [enabledEditMode, setEnableEditMode] = useState(false); // Внизу имеется кнопка для редактирования полей формы.
  const [disabledButtonSaved, setDisabledButtonSaved] = useState(false);

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

  }, [currentUser]);

  useEffect(() => {

    switch (true) {
      case !isValid:
        setDisabledButtonSaved(true);
        break;

      case isValid && name === currentUser.name && email === currentUser.email:
        setDisabledButtonSaved(true);
        break;

      case isValid && (name === currentUser.name || email === currentUser.email):
        setDisabledButtonSaved(false);
        break;

      default:
        setDisabledButtonSaved(false);
    }

  }, [currentUser.email, currentUser.name, email, name, isValid, enabledEditMode]);

  function handleBtnEdit() {
    setEnableEditMode(true);
    setDisabledButtonSaved(true);
  }

  const handleProfileUpdate = (userData) => {

    props.setIsVisibleLoader(true);
    api
      .setUserInfo(userData)
      .then((updateUserData) => {
        props.setCurrentUser(updateUserData.data);
        setMessageError(false);
        setEnableEditMode(false);
        setDisabledButtonSaved(false);
      })
      .catch(err => {
        setMessageError(true);
        setDisabledButtonSaved(true);
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
                    disabled: enabledEditMode ? false : true,
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
                      setName(e.target.value);
                      setMessageError(false);
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
                    disabled: enabledEditMode ? false : true,
                    required: "Обязательно укажите e-mail",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Введите e-mail в формате example@gmail.com",
                    },
                    onChange: (e) => {
                      setEmail(e.target.value);
                      setMessageError(false);
                    },
                  })}
                  type="email"
                  inputMode="email"
                  className="profile-form__input"
                  name="email"
                  defaultValue={currentUser.email}
                />
              </label>

              <span className="profile-form__error-message">
                {errors?.email && (errors?.email?.message || "Пожалуйста, введите правильно адрес электронной почты")}
              </span>

            </div>
            <div className="profile-form__content-bottom">
              <div className="profile-form-actions">
                {messageError && (
                  <p className="profile-form-actions__error-message">При обновлении профиля произошла ошибка. Повторите попытку позже или попробуйте другой email</p>
                )}
                {
                  !enabledEditMode ? (
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
                      disabled={disabledButtonSaved}
                      data-target={disabledButtonSaved}
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

