import React, {useState} from "react";
import { Link } from "react-router-dom";

function Profile(){

  const [formValue, setFormValue] = useState({
    email: 'pochta@yandex.ru',
    firstName: 'Виталий'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  return (
    <section className="profile" aria-label="Личный кабинет">
      <div className="profile__container">
        <h1 className="profile__header">Привет, Виталий!</h1>

        <form className="profile-form">
          <div className="profile-form__content">
            <div className="profile-form__content-top">
              <label className="profile-form__label">
                <span className="profile-form__title">Имя</span>
                <input onChange={handleChange} type="text" className="profile-form__input" name="firstName" value={formValue.firstName}  />
              </label>
              <label className="profile-form__label">
                <span className="profile-form__title">E-mail</span>
                <input onChange={handleChange} type="email" inputMode="email" className="profile-form__input" name="email"
                  value={formValue.email} disabled />
              </label>

            </div>
            <div className="profile-form__content-bottom">
              <div className="profile-form-actions">
                <p className="profile-form-actions__error-message">При обновлении профиля произошла ошибка.</p>
                <button type="button" className="profile-form-actions__btn profile-form-actions__btn_edit">Редактировать</button>
                <Link to="/" className="profile-form-actions__btn profile-form-actions__btn_exit">Выйти из аккаунта</Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Profile;

