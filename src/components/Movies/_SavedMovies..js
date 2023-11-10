import React, { useEffect, useState } from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { apiMovies, api } from '../../utils/Api';

function SavedMovies({ ...props }) {
  const [savedMovies, setSavedMovies] = React.useState(props.savedMoviesList);
  const [filteredMovies, setFilteredMovies] = React.useState([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [shortMovies, setShortMovies] = useState('off');
  const [filteredSavedMovies, setFilteredSavedMovies] = React.useState([]);

  const [isSearchError, setIsSearchError] = useState('');
  const [isNotFound, setIsNotFound] = useState(false);
  const [isLoadingMovies, setIsLoadingMovies] = useState(false);

  useEffect(() => {
    console.log('1');

    const arr = props.savedMoviesList;
    console.log('arr = ', arr);
    if ( arr.length ){
      setSavedMovies(arr);
    }

    setFilteredMovies(shortMovies === 'on' ? filterShortMovies(arr) : arr);
    // handleSetFilteredMovies(filteredMovies, searchQuery, shortMovies);
  }, [shortMovies, savedMovies, props.savedMoviesList]);



  function handleChangeSearch(e) {
    let val = e.target.value;
    console.log(`handleChangeSearch >>> val = ${val}`);
    setSearchQuery(val);
  }

  function handleChangeShorts(e) {
    console.log('2');
    const val = e.target.checked;
    // console.log(`handleChangeShorts val = + ${val}`);
    if (val) {
      setShortMovies('on');
    } else {
      setShortMovies('off');
    }
    console.log('shortMovies =>>> ', shortMovies);
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
    console.log(`handleSubmit >>> movies = ${movies}`);

    if (movies.length) {
      console.log('app.js >>> movies.length = ' + movies.length);
      handleSetFilteredMovies(movies, searchQuery, shortMovies);
      setIsLoadingMovies(false);
    } else {
      console.log('app.js >>> ! movies.length');
      console.log('handleSubmit >>> Подгружаем фильмы >>> loading ... ...');
      // console.log(`typeof apiMovies = ${typeof apiMovies}`);
    }
  }

  function filterShortMovies(movies) {
    console.log('5');

    if (movies !== null && movies.length > 0) {
      console.log('movies.length = ' + movies.length);
      const getShortMovies = movies.filter((item) => item.duration <= 40);
      console.log('getShortMovies = ', getShortMovies);
      return getShortMovies;
    }
  };

  function filterMovies(movies) {
    let filteredMoviesArray = [];

    // console.log(`movies`, movies);

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
    console.log('__6');
    console.log('setFilteredMovies = ', filteredMovies);
  }

  return (
    <>

      <section className="movies" id="movies" aria-label="Фильмотека">
        <h2>Орнул орленок во все орлиное!</h2>

        <SearchForm
          isPageSaveMovies={props.isPageSaveMovies}

          isSearchError={isSearchError}
          searchQuery={searchQuery}
          handleSubmit={handleSubmit}
          shortMovies={shortMovies}
          handleChangeShorts={handleChangeShorts}
          handleChangeSearch={handleChangeSearch}
        />

        <MoviesCardList
          isPageSaveMovies={props.isPageSaveMovies}

          list={savedMovies}
          setIsNotFound={props.setIsNotFound}
          savedMovies={savedMovies}

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
