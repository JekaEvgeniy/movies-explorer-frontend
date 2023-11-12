import React, { useEffect, useState } from 'react';
import { sortMovies, filterSortShortMovies } from '../../utils/Common';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { apiMovies, api } from '../../utils/Api';

function Movies({ ...props }) {

  const [searchQuery, setSearchQuery] = useState('');
  const [shortMovies, setShortMovies] = useState(localStorage.getItem('shortMovies') === 'on' ? 'on' : 'off');

  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [allMovies, setAllMovies] = React.useState([]);


  const [isSearchError, setIsSearchError] = useState('');
  const [isNotFound, setIsNotFound] = useState(false);

  const [isLoadingMovies, setIsLoadingMovies] = useState(false);

  // https://stackoverflow.com/questions/56356900/way-to-determine-checkbox-checked-in-react-usestate
  function handleCheckbox(e) {
    const val = e.target.checked;
    if (val) {
      localStorage.setItem('shortMovies', 'on')
      setShortMovies('on');
    } else {
      localStorage.setItem('shortMovies', 'off');
      setShortMovies('off');
    }
  }

  function handleChangeValue(e) {
    let val = e.target.value;
    setSearchQuery(val);
  }

  function handleSortMovies(movies, query, checkbox) {
    const moviesList = sortMovies(movies, query, shortMovies);

    if (!moviesList.length) {
      // Нет ни одного фильма отвечающему запросу
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }

    let itemList = checkbox === 'on' ? filterSortShortMovies(moviesList) : moviesList;
    setFilteredMovies(itemList);
  }

  function handleSubmit(e) {
    // Если пользователь ещё ничего не искал, блока с карточками на странице нет.
    e.preventDefault();

    if (!searchQuery) {
      setIsSearchError('Нужно ввести ключевое слово');

      return;
    }

    setIsSearchError('');
    let movies = localStorage.getItem('movies');

    localStorage.setItem('searchQuery', searchQuery);

    if (movies?.length && movies?.length !== 0) {
      setAllMovies(movies);
      handleSortMovies(movies, searchQuery, shortMovies);
      setIsLoadingMovies(false);

    } else {
      console.log('>>> Подгружаем фильмы >>> loading ... ... API ...');

      Promise.all([apiMovies()])
        .then(([items]) => {
          if (items.length) {
            if (!localStorage.hasOwnProperty('movies')) {
              localStorage.setItem('movies', JSON.stringify(items));
              setAllMovies(items);
            }

            if (!localStorage.hasOwnProperty('shortMovies')) {
              localStorage.setItem('shortMovies', 'off');
              setShortMovies('off');
            }

            handleSortMovies(items, searchQuery, shortMovies);
          }
        })
        .catch((err) => {
          console.error(`Ошибка promise.all: ${err}`);
          setIsSearchError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
        })
        .finally(function () {
          // выполнится, когда операция завершилась успехом или ошибкой
          setIsLoadingMovies(false);
        })
        ;
    }
  }




  useEffect(() => {
    // console.log('1. useEffect >>> Если пользователь ничего не искал, то фильмы выводить не нужно!');
    setIsSearchError('');
    const searchQuery = localStorage.getItem('searchQuery') || '';
    setSearchQuery(searchQuery);

    const arr = JSON.parse(localStorage.getItem('filteredMovies'));
    if (arr?.length) {
      setFilteredMovies(shortMovies === 'on' ? filterSortShortMovies(arr) : arr);
      setIsLoadingMovies(false);
    }
  }, [shortMovies]); // searchQuery, movies


  return (
    <section className="movies" id="movies" aria-label="Фильмотека">
      <SearchForm
        isPageSaveMovies={props.isPageSaveMovies}

        isSearchError={isSearchError}
        searchQuery={searchQuery}
        handleSubmit={handleSubmit}
        shortMovies={shortMovies}
        handleCheckbox={handleCheckbox}
        handleChangeValue={handleChangeValue}
      />
      <MoviesCardList
        isPageSaveMovies={props.isPageSaveMovies}

        list={filteredMovies}
        setIsNotFound={props.setIsNotFound}
        savedMovies={props.savedMoviesList}

        onLike={props.onLikeClick}
        onDelete={props.onDeleteClick}
      />

      {props.isLoadingMovies && (
        <Preloader />
      )}
    </section>
  );

}

export default Movies;
