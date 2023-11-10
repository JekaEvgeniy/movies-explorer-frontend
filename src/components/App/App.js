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
import SavedMovies from "../Movies/SavedMovies";

// import SearchForm from "../SearchForm/SearchForm";
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

  const navigate = useNavigate();

  // https://reactrouter.com/en/main/hooks/use-navigate
  // ERROR useNavigate() may be used only in the context of a <Router> component.
  // https://bobbyhadz.com/blog/react-usenavigate-may-be-used-only-in-context-of-router

  const [savedMovies, setSavedMovies] = React.useState([]);
  const [isVisibleLoader, setIsVisibleLoader] = useState(false); // Лоадер поверх всех элементов

  useEffect(() => {
    if (loggedIn) {
      const token = localStorage.getItem('jwt');

      Promise.all([api.getUserInfo(), api.getUsersMovies()])
        .then(([info, dataMovies]) => {
          // console.log('setCurrentUser info ===> ', info);

          setSavedMovies(dataMovies);

          if (token) {
            setCurrentUser(info);
          }
        })
        .catch((err) => console.log(`Ошибка promise.all: ${err}`));
    }

    // console.log(`useEffect >>> loggedIn = ${loggedIn}`);

  }, [loggedIn]);

  // useEffect(() => {
  //   /**
  //    * ТЗ: Если при загрузке страницы поиск не выполнялся, то фильмы не показываем.
  //    */
  //   console.log('userEffect => [shortSavedMovies]');
  //   setSearchQuery(savedSearchQuery);
  //   const arr = savedMovies;

  //   setShortMovies(savedMovies);
  //   setFilteredMovies(shortSavedMovies === 'on' ? filterShortMovies(arr) : arr);

  //   setIsLoadingMovies(false);

  // }, [shortSavedMovies, savedMovies]); // searchQuery

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    // console.log(`jwt token = ${token}`);

    if (token) {
      auth.checkToken(token)
        .then(user => {
          setLoggedIn(true);
          handleLogin(user);

          // navigate('/');
        })
        .catch((err) => {
          // console.error(`front> >>> APP.js >>> useEffect`);
          console.error(err);
        });
    }
  }, [navigate]);

  const handleLogin = () => {
    setLoggedIn(true);
  }

  const handleLogout = (e) => {
    e.preventDefault();
    console.log('handleLogout>>>>');
    localStorage.clear();
    navigate('/');
    setLoggedIn(false);
  }



  function handleSaveMovie(movie) {
    console.log(`>>> click handleSaveMovie >>>`);

    // let currentMovie = movie.currentTarget.closest('.movie');
    let currentMovie = movie;
    console.log('currentMovie >>> ', currentMovie);

    api
      .saveNewMovie(currentMovie)
      .then(newMovie => {
        setSavedMovies([newMovie, ...savedMovies]);
        console.log('>>> app.js handleSaveMovie(movie) ');
      })
      .catch(err => console.log(`handleSaveMovie.catch >>>> err = ${err}`))
  };

  function handleDeleteMovie(movie) {
    console.log(`>>> click handleDeleteMovie >>>`);
    api
      .deleteMovie(movie._id)
      .then(() => {

        const newMoviesList = savedMovies.filter((m) => m._id === movie._id ? false : true);
        setSavedMovies(newMoviesList);
        console.log('newMoviesList', newMoviesList);

        if (newMoviesList.length){

        }


      })
      .catch(err => console.log(err))
  };





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


        <Route path="/signup" element={
          <>
            <main className="content">
              <Register setIsVisibleLoader={setIsVisibleLoader} />
              {isVisibleLoader && (
                <Preloader currentPosition="fullscreen" />
              )}
            </main>
          </>
        } />
        <Route path="/signin" element={
          <>
            <main className="content">
              <Login setIsVisibleLoader={setIsVisibleLoader}  />
              {isVisibleLoader && (
                <Preloader currentPosition="fullscreen" />
              )}
            </main>
          </>
        } />


        <Route path="/movies" element={
          <>
            <Header isPageMovies />
            <main className="content">
              {/* <SearchForm
                isSearchError={isSearchError}
                searchQuery={searchQuery}
                handleSubmit={handleSubmit}
                handleChangeShorts={handleChangeShorts}
                shortMovies={shortMovies}
                handleChangeSearch={handleChangeSearch}
              /> */}
              <Movies
                // setIsNotFound={setIsNotFound}

                savedMoviesList={savedMovies}
                // list={filteredMovies}
                onLikeClick={handleSaveMovie}
                onDeleteClick={handleDeleteMovie}
              />

            </main>
            <Footer />
          </>
        } />
        <Route path="/saved-movies" element={
          <>
            <Header isPageMovies />
            <main className="content">
              <SavedMovies
                isPageSaveMovies
                // setIsNotFound={setIsNotFound}

                savedMoviesList={savedMovies}
                // list={savedMovies}
                onDeleteClick={handleDeleteMovie}
              />

            </main>
            <Footer />
          </>
        } />

        {/* <Route path="/saved-movies" element={
          <>
            <Header isPageMovies />
            <main className="content">
              <SearchForm
                isPageSaveMovies
                isSearchError={isSearchError}
                searchQuery={savedSearchQuery}
                handleSubmit={handleSubmit}
                handleChangeShorts={handleChangeSavedShorts}
                shortMovies={shortMovies}
                handleChangeSearch={handleChangeSavedSearch}
              />
                <Movies
                  isPageSaveMovies
                  setIsNotFound={setIsNotFound}
                  isLoadingMovies={isLoadingMovies}

                  // savedMoviesList={savedMovies}
                  // onLikeClick={handleSaveMovie}
                  // list={savedMovies}
                  savedMoviesList={savedMovies}
                  list={filteredMovies}
                  onDeleteClick={handleDeleteMovie}
                />

            </main>
            <Footer />
          </>
        } /> */}

        <Route path="/profile" element={
          <>
            <Header isPageProfile />
            <main className="content">
              <Profile
                setCurrentUser={setCurrentUser}
                handleLogout={handleLogout}
                setIsVisibleLoader={setIsVisibleLoader}
                // handleProfileUpdate={handleProfileUpdate}
              />
              {isVisibleLoader && (
                <Preloader currentPosition="fullscreen" />
              )}
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
