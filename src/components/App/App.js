import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';

import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';

import { api } from '../../utils/Api';
import * as auth from '../../utils/Auth';

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
  const [loggedIn, setLoggedIn] = useState(false);
  // const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});

  const navigate = useNavigate();

  const [savedMovies, setSavedMovies] = React.useState([]);
  const [isVisibleLoader, setIsVisibleLoader] = useState(false); // Лоадер поверх всех элементов

  useEffect(() => {
    if (loggedIn) {
      const token = localStorage.getItem('jwt');

      Promise.all([api.getUserInfo(), api.getUsersMovies()])
        .then(([info, dataMovies]) => {
          // console.log('setCurrentUser info ===> ', info);
          console.log('Сохраненные карточки = ', dataMovies);

          setSavedMovies(dataMovies);

          if (token) {
            setCurrentUser(info);
          }
        })
        .catch((err) => console.log(`Ошибка promise.all: ${err}`));
    }

  }, [loggedIn]);

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
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
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





  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">

        <Routes>
          <Route path="/signup" element={
            <>
              <Register setIsVisibleLoader={setIsVisibleLoader} handleRegister={handleRegister} />
              {isVisibleLoader && (
                <Preloader currentPosition="fullscreen" />
              )}
            </>
          } />

          <Route path="/signin" element={
            <>
              <main className="content">
                <Login setIsVisibleLoader={setIsVisibleLoader} handleLogin={handleLogin} />
                {isVisibleLoader && (
                  <Preloader currentPosition="fullscreen" />
                )}
              </main>
            </>
          } />

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
        </Routes>

        <Routes>
          <Route
            path="/movies"
            element={
              <>
                <Header isPageMovies />
                <ProtectedRoute
                  element={Movies}
                  loggedIn={loggedIn}
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
                <SavedMovies
                  element={Movies}
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
                  <Profile
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
          <Route path="*" element={<Page404 />} />
        </Routes>

      </div>
    </CurrentUserContext.Provider>

  ); // END return



}

export default App;
