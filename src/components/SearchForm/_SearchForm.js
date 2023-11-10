import React from "react";
import Sprite from '../../images/common/sprite.svg';

function SearchForm({ ...props }) {

  const checkPageSavedMovies = props.isPageSaveMovies;
  console.log(`checkPageSavedMovies = ${checkPageSavedMovies}`);
  let inputDepending = checkPageSavedMovies ? props.saveSearchQuery : props.searchQuery
  let changeDepending = checkPageSavedMovies ? props.handleChangeSavedSearch : props.handleChangeSearch;
  let shortMoviesDepending = checkPageSavedMovies ? props.shortSaveMovies : props.shortMovies;
  let onChangeDepending = checkPageSavedMovies ? props.handleChangeSaveShorts : props.handleChangeShorts;

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
            onChange={changeDepending}
            value={inputDepending}
          />
          <button type='submit' className="search-form__btn" aria-label="Поиск">
            <svg aria-hidden="true" className="image-contain" xmlns="http://www.w3.org/2000/svg">
              <use href={`${Sprite}#search-btn`}></use>
            </svg>
          </button>
        </div>

        <div className="search-form__message">{props.isSearchError}</div>

        <div className="search-checkbox">
          <label className="search-checkbox__label">
            <input type="checkbox" className="search-checkbox__input"
              name="shortMovies"
              checked={shortMoviesDepending === 'on' ? true : false}
              value={shortMoviesDepending === 'on' ? 'on' : 'off'}
              onChange={onChangeDepending}
            />
            <span className="search-checkbox__ico"></span>
            <span className="search-checkbox__title">Короткометражки</span>
          </label>
        </div>
      </form>
    </section>
  )
}

export default SearchForm;
