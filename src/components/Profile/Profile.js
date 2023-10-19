import React from "react";

function Profile(){
  return (
    <section className="profile" aria-label="Личный кабинет">
      <div className="profile__container">
        <h1 className="profile__header">Привет, Виталий!</h1>

        <form className="profile-form">
          <div className="profile-form__content">
            <div className="profile-form__content-top">
              <label className="profile-form__label">
                <span className="profile-form__title">Имя</span>
                <input type="text" className="profile-form__input" value="Виталий"  />
              </label>
              <label className="profile-form__label">
                <span className="profile-form__title">E-mail</span>
                <input type="email" inputMode="email" className="profile-form__input" value="pochta@yandex.ru" disabled />
              </label>

            </div>
            <div className="profile-form__content-bottom">
              <div className="profile-form-actions">
                <p className="profile-form-actions__error-message">При обновлении профиля произошла ошибка.</p>
                <button type="button" className="profile-form-actions__btn profile-form-actions__btn_edit">Редактировать</button>
                <button type="button" className="profile-form-actions__btn profile-form-actions__btn_exit">Выйти из аккаунта</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Profile;

