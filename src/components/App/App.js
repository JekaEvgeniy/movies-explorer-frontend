import React, { useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";

import { apiMovies } from '../../utils/Api';

import Main from "../Main/Main";
import Login from "../Login/Login";
import Register from "../Register/Register";
import { arrMovies } from '../../utils/arrMovies'
import Movies from "../Movies/Movies";
import SearchForm from "../SearchForm/SearchForm";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Profile from '../Profile/Profile';
import Page404 from '../Page404/Page404';
import Preloader from '../Preloader/Preloader';


/*
  error: react-dom.development.js:86 Warning: Received the string `true` for the boolean attribute `checked`. Although this works, it will not work as expected if you pass the string "false". Did you mean checked={true}?
*/
// const [shortMovies, setShortMovies] = useState( localStorage.getItem('shortMovies') || false );

function App() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = React.useState([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [shortMovies, setShortMovies] = useState(localStorage.getItem('shortMovies') === 'on' ? 'on' : 'off');

  const [isLoadingMovies, setIsLoadingMovies] = React.useState(false);

  const localStorageMovies = localStorage.getItem('movies');

  useEffect(() => {
    /**
     * 1. Если при загрузке страницы поиск не выполнялся, то фильмы не показываем.
     */

    // console.warn(`searchQuery = ${searchQuery}`);

    if (searchQuery) {
      const arr = filterMovies(movies, searchQuery, shortMovies);
      setFilteredMovies(arr);
    } else {
      //console.log(`searchQuery = ${searchQuery} >>> Если пользователь ещё ничего не искал, блока с карточками на странице нет.`);

      const arr = JSON.parse(localStorage.getItem('movies'));
      setShortMovies(localStorage.getItem('shortMovies'));
      setFilteredMovies(shortMovies === 'on' ? filterShortMovies(arr) : arr);
    }
  }, [shortMovies, movies]); // searchQuery

  // https://stackoverflow.com/questions/56356900/way-to-determine-checkbox-checked-in-react-usestate
  function handleChangeShorts(e) {
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
    let val = e.target.value;
    // console.log(`handleChangeSearch >>> val = ${val}`);
    setSearchQuery(val);
  }

  function handleSetFilteredMovies(movies, query, checkbox) {
    /**
      * Как только запрос сделан, данные передаются в стейт-переменную и блок появляется. Для отрисовки данных воспользуйтесь хуком.
    */
    const moviesList = filterMovies(movies, query);

    // console.log('moviesList => ', moviesList);

    setFilteredMovies(checkbox === 'on' ? filterShortMovies(moviesList) : moviesList);
    localStorage.setItem('movies', JSON.stringify(moviesList));
  }

  function filterShortMovies(movies) {
    if (movies !== null && movies.length > 0){
      console.log('movies.length = ' + movies.length);
      return movies.filter((item) => item.duration <= 40);
    }
  };

  function handleSubmit(e) {
    /**
     * Если пользователь ещё ничего не искал, блока с карточками на странице нет.
    */
    // FIXME: Сделать проверку на отправку пустой строки!
    // console.log('>>> handleSubmit >>>');
    e.preventDefault();

    console.log(`handleSubmit() >>> val || searchText = ${searchQuery}`);
    if (!searchQuery) {
      console.error('handleSubmit >>> input.val пустой');
      return;
    }

    console.log(`searchQuery >>>> ${searchQuery}`);

    setIsLoadingMovies(true);
    setSearchQuery(searchQuery);

    localStorage.setItem('searchQuery', searchQuery);
    localStorage.setItem('shortMovies', shortMovies);

    // console.log(`handleSubmit >>> movies = ${movies}`);

    if (movies.length) {
      setIsLoadingMovies(false);
      handleSetFilteredMovies(movies, searchQuery, shortMovies);
    } else {
      console.log('handleSubmit >>> Подгружаем фильмы >>> loading ... ...');
      Promise.all([apiMovies()])
        .then(([items]) => {
          if (items.length) {

            if (!localStorage.hasOwnProperty('moviesAll')) {
              // Записываем в localStorage все фильмы
              // localStorage.setItem('moviesAll', JSON.stringify(items)); // fixme: Удалить
            }
            setMovies(items);

            // console.warn(items)
            // console.warn(searchQuery)
            // console.warn(shortMovies)
            handleSetFilteredMovies(items, searchQuery, shortMovies);
          }
        })
        .catch((err) => console.error(`Ошибка promise.all: ${err}`)); // "[object Obj"... is not valid JSON
    }
  }

  function filterMovies(movies) {
    let filteredMoviesArray = [];

    // console.log(`movies`, movies);

    if (movies !== null && movies.length > 0) {
      const films = movies;
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

    // console.log('filteredMoviesArray = ', filteredMoviesArray);

    return filteredMoviesArray;
  }


  return (
    <div className="app">

      <Routes>

        <Route exact path="/" element={<Main />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />


        <Route path="/movies" element={
          <>
            <Header isPageMovies />
            <main className="content">
              <SearchForm
                searchQuery={searchQuery}
                handleSubmit={handleSubmit}
                handleChangeShorts={handleChangeShorts}
                shortMovies={shortMovies}
                handleChangeSearch={handleChangeSearch}
              />
              <Movies list={filteredMovies} />
            </main>
            <Footer />
          </>
        } />

        <Route path="/saved-movies" element={
          <>
            <Header isPageMovies />
            <main className="content">
              <SearchForm />
              <Movies list={filteredMovies} isSaveMovies />
            </main>
            <Footer />
          </>
        } />

        <Route path="/profile" element={
          <>
            <Header isPageProfile />
            <main className="content">
              <Profile />
            </main>
          </>
        } />

        <Route path="*" element={<Page404 />} />

      </Routes>

    </div>
  );
}

export default App;
