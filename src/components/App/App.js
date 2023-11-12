import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';

import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';

import { api } from '../../utils/Api';
import * as auth from '../../utils/Auth';
import { checkToken } from '../../utils/Auth';

import Main from "../Main/Main";
import Login from "../Login/Login";
import Register from "../Register/Register";
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
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('jwt') ? true : false);
  // const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});

  const navigate = useNavigate();

  const [savedMovies, setSavedMovies] = React.useState([]);
  const [isVisibleLoader, setIsVisibleLoader] = useState(false); // Лоадер поверх всех элементов

  useEffect(() => {
    // При обновлении страницы - идет редирект на галвную.
    handleTokenCheck();
  }, []);
/*
  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      setLoggedIn(true)
    }
console.log("loggedIn", loggedIn)
  }, [navigate]); */

  useEffect(() => {
    if (loggedIn) {
      const token = localStorage.getItem('jwt');

      Promise.all([api.getUserInfo(), api.getUsersMovies()])
        .then(([info, dataMovies]) => {

          if (token) {
            handleLogin();

            setSavedMovies(dataMovies);
            setCurrentUser(info);
            console.log('info = ', info);
            console.log('Сохраненные карточки = ', dataMovies);
          }
          // console.log('setCurrentUser info ===> ', info);
        })
        .catch((err) => console.log(`Ошибка promise.all: ${err}`));
    }

  }, [loggedIn]); // currentUser._id

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    // console.log(`jwt token = ${token}`);

    if (token) {
      auth.checkToken(token)
        .then(user => {
          setLoggedIn(true);

          handleLogin(user);

          // navigate('/movies');
        })
        .catch((err) => {
          console.error(err);
        });
    }
    // }, []); // remove 21-40
  }, [navigate]);

  const handleLogin = () => {
    setLoggedIn(true);
    handleTokenCheck();
  }

  const handleRegister = ({ email, password }) => {
    //
    auth
      .register(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);

        setLoggedIn(true);
        navigate('/');
      })
      .catch(err => {
        console.err(`front> >>> APP.js >>> handleRegister()`);
        console.error(err);
      });
  }


  const handleLogout = (e) => {
    e.preventDefault();

    console.log('handleLogout>>>>');

    localStorage.clear();
    navigate('/');
    setLoggedIn(false);
  }



  function handleSaveMovie(movie) {
    // console.log(`>>> click handleSaveMovie >>>`);

    // let currentMovie = movie.currentTarget.closest('.movie');
    // let currentMovie = movie;
    // console.log('currentMovie >>> ', currentMovie);

    api
      .saveNewMovie(movie)
      .then(newMovie => {
        setSavedMovies([newMovie, ...savedMovies]);
        // console.log('>>> app.js handleSaveMovie(movie) ');
      })
      .catch(err => console.log(`handleSaveMovie.catch >>>> err = ${err}`))
  };

  function handleDeleteMovie(movie) {
    // console.log(`>>> click handleDeleteMovie >>>`);
    // console.log('handleDeleteMovie movie', movie);
    api
      .deleteMovie(movie._id)
      // .deleteMovie(movie.movieId)
      .then(() => {

        const newMoviesList = savedMovies.filter((m) => m._id === movie._id ? false : true);
        setSavedMovies(newMoviesList);
        // console.log('newMoviesList', newMoviesList);
      })
      .catch(err => console.log(err))
  };


  const handleTokenCheck = () => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      checkToken(jwt)
        .then((res) => {
          if (res) {
            console.log("loggedIn", loggedIn)
            setLoggedIn(true);

            // console.log(`>>> !!! navigate('/movies')`);
            // navigate("/movies");
          }
        })
        .catch((err) => console.log("Ошибка", err));
    }
  };


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
      <Routes>

          <Route
            path="/movies"
            element={

              <>
                <Header isPageMovies />
                <ProtectedRoute
                  loggedIn={loggedIn}
                  element={Movies}
                  savedMoviesList={savedMovies}
                  // list={filteredMovies}
                  onLikeClick={handleSaveMovie}
                  onDeleteClick={handleDeleteMovie}
                />
                <Footer />
              </>
            }
          />

          <Route
            path="/saved-movies"
            element={

              <>
                <Header isPageMovies />
                <ProtectedRoute
                  loggedIn={loggedIn}
                  element={SavedMovies}
                  isPageSaveMovies
                  // setIsNotFound={setIsNotFound}

                  savedMoviesList={savedMovies}
                  // list={savedMovies}
                  onDeleteClick={handleDeleteMovie}
                />
                <Footer />
              </>
            }
          />


          <Route
            path="/profile"
            element={
              <>
                <Header isPageProfile />
                <main className="content">
                  <ProtectedRoute
                    loggedIn={loggedIn}
                    element={Profile}
                    setCurrentUser={setCurrentUser}
                    handleLogout={handleLogout}
                    setIsVisibleLoader={setIsVisibleLoader}
                  />
                  {isVisibleLoader && (
                    <Preloader currentPosition="fullscreen" />
                  )}
                </main>
                <Footer />
              </>
            }
          />


          {/* <Route
            path="/profile"
            element={
              <>
                <Header isPageProfile />
                <main className="content">
                  <Profile
                    loggedIn={loggedIn}
                    setCurrentUser={setCurrentUser}
                    handleLogout={handleLogout}
                    setIsVisibleLoader={setIsVisibleLoader}
                  />
                  {isVisibleLoader && (
                    <Preloader currentPosition="fullscreen" />
                  )}
                </main>
                <Footer />
              </>
            }
          /> */}

          <Route path="*" element={<Page404 />} />

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
            loggedIn ? <Navigate to='/movies' /> :
            <>
              <Register setIsVisibleLoader={setIsVisibleLoader} handleRegister={handleRegister} />
              {isVisibleLoader && (
                <Preloader currentPosition="fullscreen" />
              )}
            </>
          } />

          <Route path="/signin" element={
            loggedIn ? <Navigate to='/movies' /> :
            <>
              <main className="content">
                <Login setIsVisibleLoader={setIsVisibleLoader} handleLogin={handleLogin} />
                {isVisibleLoader && (
                  <Preloader currentPosition="fullscreen" />
                )}
              </main>
            </>
          } />



        </Routes>

      </div>
    </CurrentUserContext.Provider>

  ); // END return



}

export default App;
