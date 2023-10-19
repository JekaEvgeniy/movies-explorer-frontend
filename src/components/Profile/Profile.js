import React from "react";

function Profile(){
  return (
    <section class="profile" aria-label="Личный кабинет">
      <div class="profile__container">
        <h1 class="profile__header">Привет, Виталий!</h1>

        <form class="profile-form">
          <div class="profile-form__content">
            <div class="profile-form__content-top">
              <label class="profile-form__label">
                <span class="profile-form__title">Имя</span>
                <input type="text" class="profile-form__input" value="Виталий" disabled />
              </label>
              <label class="profile-form__label">
                <span class="profile-form__title">E-mail</span>
                <input type="email" inputMode="email" class="profile-form__input" value="pochta@yandex.ru" disabled />
              </label>

            </div>
            <div class="profile-form__content-bottom">
              <div class="profile-form-actions">
                <p class="profile-form-actions__error-message">При обновлении профиля произошла ошибка.</p>
                <button type="button" class="profile-form-actions__btn profile-form-actions__btn_edit">Редактировать</button>
                <button type="button" class="profile-form-actions__btn profile-form-actions__btn_exit">Выйти из аккаунта</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Profile;

