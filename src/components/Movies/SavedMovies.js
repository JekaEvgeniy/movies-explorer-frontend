import React, { useEffect, useState } from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import Sprite from '../../images/common/sprite.svg';
import { apiMovies, api } from '../../utils/Api';

function SavedMovies({ ...props }) {
  const [movies, setMovies] = React.useState(props.savedMoviesList);
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [filteredShortMovies, setFilteredShortMovies] = React.useState([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [shortMovies, setShortMovies] = useState('off');

  const [isSearchError, setIsSearchError] = useState('');
  const [isNotFound, setIsNotFound] = useState(false);
  const [isLoadingMovies, setIsLoadingMovies] = useState(false);

  useEffect(() => {
    // console.log('=====================>>>>>> useEffect');
    const arr = props.savedMoviesList;
    // console.log('arr = ', arr);
    if ( arr.length ){
      setMovies(arr);
    }

    setFilteredMovies(shortMovies === 'on' ? filterShortMovies(arr) : arr);
  }, [shortMovies, movies, props.savedMoviesList]);

  function handleChangeShorts(e) {
    const val = e.target.checked;
    console.log(`e.target.checked = ${e.target.checked}`);
    if (val) {
      setShortMovies('on');
    } else {
      setShortMovies('off');
    }
  }

  function handleChangeSearch(e) {
    let val = e.target.value;
    setSearchQuery(val);
  }




  function handleSubmit(e) {
    /**
     * Если пользователь ещё ничего не искал, блока с карточками на странице нет.
    */
    e.preventDefault();

    console.log(`handleSubmit() >>> val || searchText = ${searchQuery}`);
    if (!searchQuery) {
      // FIXME: Сделать проверку на отправку пустой строки!
      console.error('handleSubmit >>> input.val пустой');
      setIsSearchError('Нужно ввести ключевое слово');

      return;
    }

    //console.log(`searchQuery >>>> ${searchQuery}`);

    setIsSearchError('');
    setIsLoadingMovies(true);
    setSearchQuery(searchQuery);

    const movies = props.savedMoviesList;
    // console.log(`handleSubmit >>> movies = ${movies}`);

    if (movies.length) {
      // console.log('app.js >>> movies.length = ' + movies.length);
      handleSetFilteredMovies(movies, searchQuery, shortMovies);
      setIsLoadingMovies(false);
    } else {
      // console.log('app.js >>> ! movies.length');
      // console.log('handleSubmit >>> Подгружаем фильмы >>> loading ... ...');
      // console.log(`typeof apiMovies = ${typeof apiMovies}`);
    }
  }

  function filterShortMovies(movies) {
    console.log('movies.length = ' + movies.length);

    if (movies !== null && movies.length > 0) {
      const getShortMovies = movies.filter((item) => item.duration <= 40);
      // console.log(`getShortMovies =`, getShortMovies);
      setFilteredShortMovies(getShortMovies);
      return getShortMovies;
    }
  };

  function filterMovies(movies) {
    let filteredMoviesArray = [];

    console.log(`filterMovies >>> movies`, movies);

    if (movies !== null && movies.length > 0) {
      // const films = movies;
      // const films = JSON.parse(movies);

      filteredMoviesArray = movies.filter((item) => {
        const nameRU = item.nameRU.toUpperCase().includes(searchQuery.toUpperCase()); // toLocaleUpperCase
        const nameEN = item.nameEN.toUpperCase().includes(searchQuery.toUpperCase());

        return nameRU || nameEN;
      });
    }

    // console.log(`shortMovies = ${shortMovies}`);
    if (shortMovies === 'on') {
      filteredMoviesArray = filteredMoviesArray.filter(movie => movie.duration <= 40);
    }

    console.log('filteredMoviesArray = ', filteredMoviesArray);

    return filteredMoviesArray;
  }

  function handleSetFilteredMovies(movies, query, checkbox) {
    /**
      * Как только запрос сделан, данные передаются в стейт-переменную и блок появляется.
      * Для отрисовки данных воспользуйтесь хуком.
    */
    const moviesList = filterMovies(movies, query);
    console.log('>>> handleSetFilteredMovies moviesList => ', moviesList);

    if (!moviesList.length) {
      // Нет ни одного фильма отвечающему запросу
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }

    console.log(`>>> handleSetFilteredMovies > isNotFound = ${isNotFound}`);

    setFilteredMovies(checkbox === 'on' ? filterShortMovies(moviesList) : moviesList);
  }

  return (
    <>
      <section className="movies" id="movies" aria-label="Фильмотека">
        <SearchForm
          isPageSaveMovies={props.isPageSaveMovies}

          isSearchError={isSearchError}
          searchQuery={searchQuery}
          handleSubmit={handleSubmit}
          shortMovies={shortMovies}
          handleChangeShorts={handleChangeShorts}
          handleChangeSearch={handleChangeSearch}
        />

        {/* <section className="search">
          <form className="search-form" name="search" onSubmit={handleSubmit}>
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
                onChange={handleChangeSearch}
                value={searchQuery}
              />
              <button type='submit' className="search-form__btn" aria-label="Поиск">
                <svg aria-hidden="true" className="image-contain" xmlns="http://www.w3.org/2000/svg">
                  <use href={`${Sprite}#search-btn`}></use>
                </svg>
              </button>
            </div>

            <div className="search-form__message">{isSearchError}</div>

            <div className="search-checkbox">
              <label className="search-checkbox__label">
                <input type="checkbox" className="search-checkbox__input"
                  name="shortMovies"
                  checked={shortMovies === 'on' ? true : false}
                  value={shortMovies === 'on' ? 'on' : 'off'}
                  onChange={handleChangeShorts}
                />
                <span className="search-checkbox__ico"></span>
                <span className="search-checkbox__title">Короткометражки {shortMovies}</span>
              </label>
            </div>
          </form>
        </section> */}


        <MoviesCardList
          isPageSaveMovies={props.isPageSaveMovies}

          list={filteredMovies}
          setIsNotFound={props.setIsNotFound}
          savedMovies={filteredMovies}

          onDelete={props.onDeleteClick}
        />

        {props.isLoadingMovies && (
          <Preloader />
        )}
      </section>
    </>
  );

}

export default SavedMovies;
