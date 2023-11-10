import React, { useEffect, useState } from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { apiMovies, api } from '../../utils/Api';

function Movies({ ...props }) {

  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = React.useState([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [shortMovies, setShortMovies] = useState(localStorage.getItem('shortMovies') === 'on' ? 'on' : 'off');

  const [isSearchError, setIsSearchError] = useState('');
  const [isNotFound, setIsNotFound] = useState(false);

  const [isLoadingMovies, setIsLoadingMovies] = useState(false);

  useEffect(() => {
    console.log('1');
    /**
     * ТЗ: Если при загрузке страницы поиск не выполнялся, то фильмы не показываем.
     */
    const searchQuery = localStorage.getItem('searchQuery') || '';

    setSearchQuery(searchQuery);
    const checkOldSearch = !!localStorage.getItem('searchQuery');
    const arr = JSON.parse(localStorage.getItem('movies'));

    setShortMovies(localStorage.getItem('shortMovies'));
    setFilteredMovies(shortMovies === 'on' ? filterShortMovies(arr) : arr);

    // if (checkOldSearch && ! arr?.length ){
    //   console.log(`Если пользователь что-то искал и не нашел, а потом обновлил страницу - показывем сообщение об ошибке.`);
    //   setIsNotFound(true);
    //   console.log(`isNotFound 0 = ${isNotFound}`);
    // } else {
    //   console.log('23');
    //   setIsNotFound(false);
    // }
    // console.log(`isNotFound 1 = ${isNotFound}`);

    setIsLoadingMovies(false);


  }, [shortMovies, movies]); // searchQuery

  // https://stackoverflow.com/questions/56356900/way-to-determine-checkbox-checked-in-react-usestate
  function handleChangeShorts(e) {
    console.log('2');
    const val = e.target.checked;
    if (val) {
      localStorage.setItem('shortMovies', 'on')
      setShortMovies('on');
    } else {
      localStorage.setItem('shortMovies', 'off');
      setShortMovies('off');
    }
  }

  function handleChangeSearch(e) {
    console.log('3');
    let val = e.target.value;
    console.log(`handleChangeSearch >>> val = ${val}`);
    setSearchQuery(val);
  }

  function handleSetFilteredMovies(movies, query, checkbox) {
    console.log('4');
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
    localStorage.setItem('movies', JSON.stringify(moviesList));
  }

  function filterShortMovies(movies) {
    console.log('5');
    if (movies !== null && movies.length > 0) {
      // console.log('movies.length = ' + movies.length);
      const getShortMovies = movies.filter((item) => item.duration <= 40);
      // console.log(`getShortMovies =`, getShortMovies);
      // localStorage.setItem('movies', JSON.stringify(getShortMovies));
      console.log('getShortMovies = ', getShortMovies);
      return getShortMovies;
    }

  };

  function handleSubmit(e) {
    console.log('6');
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

    localStorage.setItem('searchQuery', searchQuery);
    localStorage.setItem('shortMovies', shortMovies);

    // console.log(`handleSubmit >>> movies = ${movies}`);

    if (movies.length) {
      console.log('app.js >>> movies.length = ' + movies.length);
      handleSetFilteredMovies(movies, searchQuery, shortMovies);
      setIsLoadingMovies(false);
    } else {
      console.log('app.js >>> ! movies.length');
      console.log('handleSubmit >>> Подгружаем фильмы >>> loading ... ...');
      // console.log(`typeof apiMovies = ${typeof apiMovies}`);

      Promise.all([apiMovies()])
        .then(([items]) => {
          if (items.length) {

            //if (!localStorage.hasOwnProperty('moviesAll')) {
            // Записываем в localStorage все фильмы
            // localStorage.setItem('moviesAll', JSON.stringify(items)); // fixme: Удалить
            //}
            setMovies(items);

            // console.log(items);
            // console.warn(searchQuery)
            // console.warn(shortMovies)
            handleSetFilteredMovies(items, searchQuery, shortMovies);
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

  function filterMovies(movies) {
    console.log('7');
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


  return (
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
