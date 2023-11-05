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
  const [loggedIn, setLoggedIn] = useState(true); // FIXME: default FALSE

  const [movies, setMovies] = useState([]);

  useEffect(() => {


    if (loggedIn) {
      const token = localStorage.getItem('jwt');
      Promise.all([apiMovies() ])
        .then(([items]) => {
          // if (token) {
            if (items.length) {
              console.log(items[0]);
              setMovies(items);
            }
          // }
        })
        .catch((err) => console.log(`Ошибка promise.all: ${err}`));
    }

  }, [loggedIn]);



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
              <SearchForm />
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
