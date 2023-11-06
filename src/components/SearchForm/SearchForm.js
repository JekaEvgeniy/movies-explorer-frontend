import React from "react";
import Sprite from '../../images/common/sprite.svg';

function SearchForm({ ...props }) {

  return (
    <section className="search">
      <form className="search-form" name="search" onSubmit={props.handleSubmit}>
        <div className="search-form__group">
          <div className="search-form__ico">
            <svg aria-hidden="true" className="image-contain" xmlns="http://www.w3.org/2000/svg">
              <use href={`${Sprite}#search-ico`}></use>
            </svg>
          </div>
          <input
            type="text"
            className="search-form__input"
            placeholder="Фильм"
            onChange={props.handleChangeSearch}
            value={props.searchQuery}
          />
          <button type='submit' className="search-form__btn" aria-label="Поиск">
            <svg aria-hidden="true" className="image-contain" xmlns="http://www.w3.org/2000/svg">
              <use href={`${Sprite}#search-btn`}></use>
            </svg>
          </button>
        </div>

        <div className="search-checkbox">
          <label className="search-checkbox__label">
            <input type="checkbox" className="search-checkbox__input"
              name="shortMovies"
              checked={props.shortMovies === 'on' ? true : false}
              value={props.shortMovies === 'on' ? 'on' : 'off'}
              onChange={props.handleChangeShorts}
            />
            <span className="search-checkbox__ico"></span>
            <span className="search-checkbox__title">Короткометражки</span>
            {/* <span className="search-checkbox__title">Короткометражки{props.shortMovies === 'on' ? 'on' : 'off'}</span> */}
          </label>
        </div>
      </form>
    </section>
  )
}

export default SearchForm;
