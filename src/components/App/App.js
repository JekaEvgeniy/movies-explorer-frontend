import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';

import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';

import { apiMovies, api } from '../../utils/Api';
import * as auth from '../../utils/Auth';

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

import CurrentUserContext from '../../contexts/CurrentUserContext';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [email, setEmail] = useState(null);

  const navigate = useNavigate();

  // https://reactrouter.com/en/main/hooks/use-navigate
  // ERROR useNavigate() may be used only in the context of a <Router> component.
  // https://bobbyhadz.com/blog/react-usenavigate-may-be-used-only-in-context-of-router


  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = React.useState([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [shortMovies, setShortMovies] = useState(localStorage.getItem('shortMovies') === 'on' ? 'on' : 'off');

  const [isLoadingMovies, setIsLoadingMovies] = useState(false);

  const [isSearchError, setIsSearchError] = useState('');
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
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

  const handleLogin = () => {
    setLoggedIn(true);
  }

  // const handleRegister = ({ email, password }) => {

  //   auth.register(email, password)
  //     .then((res) => {
  //       localStorage.setItem("jwt", res.token);
  //       console.log('handleRegiste>>> res.token = ' + res.token);

  //       // setCurrentUser(res);
  //       // handleUpdateUser(res);
  //       // handleUpdateAvatar(res);

  //       setLoggedIn(true);
  //       navigate('/');
  //     })
  //     .catch(err => {
  //       console.err(`front> >>> APP.js >>> handleRegister()`);
  //       console.error(err);
  //     });
  // }

  useEffect(() => {
    if (loggedIn) {
      const token = localStorage.getItem('jwt');

      // Promise.all([api.getUserInfo(), api.getCards()])
      //   .then(([info, cards]) => {

      //     if (token) {
      //       setEmail(info.email);
      //       // console.log(`setCurrentUser ===> `);
      //       setCurrentUser(info);
      //       // handleUpdateUser(info);
      //       // handleUpdateAvatar(info);
      //       if (cards.length) {
      //         setCards(cards);
      //       }
      //     }
      //   })
      //   .catch((err) => console.log(`Ошибка promise.all: ${err}`));
    }

    console.log(`useEffect >>> loggedIn = ${loggedIn}`);

  }, [loggedIn]);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    console.log(`jwt token = ${token}`);

    if (token) {
      auth.checkToken(token)
        .then(user => {
          setLoggedIn(true);
          handleLogin(user);

          // navigate('/');
        })
        .catch((err) => {
          console.error(`front> >>> APP.js >>> useEffect`);
          console.error(err);
        });
    }
  }, [navigate]);






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

    console.log('moviesList => ', moviesList);

    if (! moviesList.length ){
      // Нет ни одного фильма отвечающему запросу
      setIsNotFound(true);
    }else {
      setIsNotFound(false);
    }

    console.log(`isNotFound 2 = ${isNotFound}`);

    setFilteredMovies(checkbox === 'on' ? filterShortMovies(moviesList) : moviesList);
    localStorage.setItem('movies', JSON.stringify(moviesList));
  }

  function filterShortMovies(movies) {
    if (movies !== null && movies.length > 0){
      // console.log('movies.length = ' + movies.length);
      const getShortMovies = movies.filter((item) => item.duration <= 40);
      // console.log(`getShortMovies =`, getShortMovies);
      // localStorage.setItem('movies', JSON.stringify(getShortMovies));
      return getShortMovies;
    }
  };

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

      Promise.all([apiMovies()])
        .then(([items]) => {
          if (items.length) {

            //if (!localStorage.hasOwnProperty('moviesAll')) {
              // Записываем в localStorage все фильмы
              // localStorage.setItem('moviesAll', JSON.stringify(items)); // fixme: Удалить
            //}
            setMovies(items);

            // console.warn(items)
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
    let filteredMoviesArray = [];

    console.log(`movies`, movies);

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

    // console.log('filteredMoviesArray = ', filteredMoviesArray);

    return filteredMoviesArray;
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="app">

      <Routes>

        <Route
          exact
          path="/"
          element={
            <>
              <Main
                loggedIn={loggedIn}
              />
            </>
          }
        />


        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />


        <Route path="/movies" element={
          <>
            <Header isPageMovies />
            <main className="content">
              <SearchForm
                isSearchError={isSearchError}
                searchQuery={searchQuery}
                handleSubmit={handleSubmit}
                handleChangeShorts={handleChangeShorts}
                shortMovies={shortMovies}
                handleChangeSearch={handleChangeSearch}
              />
              <Movies
                setIsNotFound={setIsNotFound}
                isLoadingMovies={isLoadingMovies}
                list={filteredMovies}
              />

            </main>
            <Footer />
          </>
        } />

        <Route path="/saved-movies" element={
          <>
            <Header isPageMovies />
            <main className="content">

              <SearchForm
                isSearchError={isSearchError}
                searchQuery={searchQuery}
                handleSubmit={handleSubmit}
                handleChangeShorts={handleChangeShorts}
                shortMovies={shortMovies}
                handleChangeSearch={handleChangeSearch}
              />
              <Movies
                isSaveMovies
                setIsNotFound={setIsNotFound}
                isLoadingMovies={isLoadingMovies}
                list={filteredMovies}
              />


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
    </CurrentUserContext.Provider>

  ); // END return



}

export default App;
