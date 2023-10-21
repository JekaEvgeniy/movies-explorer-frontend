import React from "react";
import Sprite from '../../images/common/sprite.svg';

function SearchForm(){
  return (
    <section className="search">
      <form className="search-form" name="search">
        <div className="search-form__group">
          <div className="search-form__ico">
            <svg aria-hidden="true" className="image-contain" xmlns="http://www.w3.org/2000/svg">
              <use href={`${Sprite}#search-ico`}></use>
            </svg>
          </div>
          <input type="text" className="search-form__input" placeholder="Фильм" />
          <button className="search-form__btn" aria-label="Поиск">
            <svg aria-hidden="true" className="image-contain" xmlns="http://www.w3.org/2000/svg">
              <use href={`${Sprite}#search-btn`}></use>
            </svg>
          </button>
        </div>

        <div className="search-checkbox">
          <label className="search-checkbox__label">
            <input type="checkbox" className="search-checkbox__input" name="shortMovies" />
            <span className="search-checkbox__ico"></span>
            <span className="search-checkbox__title">Короткометражки</span>
          </label>
        </div>
      </form>
    </section>
   )
}

export default SearchForm;
