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


function App() {
  const [movies, setMovies] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');
  /*
    error: react-dom.development.js:86 Warning: Received the string `true` for the boolean attribute `checked`. Although this works, it will not work as expected if you pass the string "false". Did you mean checked={true}?
  */
  // const [shortMovies, setShortMovies] = useState( localStorage.getItem('shortMovies') || false );
  const [shortMovies, setShortMovies] = useState(localStorage.getItem('shortMovies') === 'on' ? 'on' : 'off' );

  const localStorageMovies = localStorage.getItem('movies');

  useEffect(() => {
    // https://stackoverflow.com/questions/3262605/how-to-check-whether-a-storage-item-is-set
    console.log(`shortMovies_1 = ${shortMovies}`);

    Promise.all([apiMovies() ])
      .then(([items]) => {
        if (items.length) {

          if (! localStorage.hasOwnProperty('movies')){
            // Записываем в localStorage все фильмы
            localStorage.setItem('movies', JSON.stringify(items));
          }
          // setMovies(items);
        }
      })
      .catch((err) => console.log(`Ошибка promise.all: ${err}`));

  }, []);

  useEffect(() => {
    // console.log(typeof movies);
    console.log(`searchQuery = ${searchQuery}`);
    if (typeof movies == 'object') {
      search();
    }
  }, [shortMovies, searchQuery]);

  // https://stackoverflow.com/questions/56356900/way-to-determine-checkbox-checked-in-react-usestate
  function handleChangeShorts(e) {
    const val = e.target.checked;

    if ( val ) {
      localStorage.setItem('shortMovies', 'on')
      setShortMovies('on');
    } else {
      localStorage.setItem('shortMovies', 'off');
      setShortMovies('off');
    }
  }

  function handleChangeSearch(e) {
    let val = e.target.value;
    setSearchQuery(val);

  }

  function handleSubmit(e) {
    e.preventDefault();
    // FIXME: Сделать проверку на отправку пустой строки!
    // console.log('>>> handleSubmit search');
    search();
  }

  function search() {
    console.log('>>> search');
    const items = filterMovies(localStorageMovies);
    setMovies(items);

    if (! items.length === 0) {
      console.log('Ничего не найдено');
      // return;
    }

    localStorage.setItem('searchQuery', searchQuery )
  }

  function filterMovies(movies) {
    let filteredMoviesArray = [];

    if (movies !== null && movies.length > 0) {
      const films = JSON.parse(movies);

      filteredMoviesArray = films.filter((item) => {
        const nameRU = item.nameRU.toUpperCase().includes(searchQuery.toUpperCase()); // toLocaleUpperCase
        const nameEN = item.nameEN.toUpperCase().includes(searchQuery.toUpperCase());

        return nameRU || nameEN;
      });
    }

    console.log(`shortMovies = ${shortMovies}`);
    if (shortMovies === 'on') {
      filteredMoviesArray = filteredMoviesArray.filter(movie => movie.duration <= 40);
    }

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

                handleSubmit={handleSubmit}
                handleChangeShorts={handleChangeShorts}
                shortMovies={shortMovies}
                handleChangeSearch={handleChangeSearch}
              />
              <Movies list={movies} />
            </main>
            <Footer />
          </>
        } />

        <Route path="/saved-movies" element={
          <>
            <Header isPageMovies />
            <main className="content">
              <SearchForm />
              <Movies list={arrMovies} isSaveMovies />
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
