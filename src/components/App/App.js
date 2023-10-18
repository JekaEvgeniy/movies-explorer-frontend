import React, { useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";

import Main from "../Main/Main";
import Login from "../Login/Login";
import Register from "../Register/Register";
import {arrMovies} from '../../utils/arrMovies'
import Movies from "../Movies/Movies";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Profile from '../Profile/Profile';


function App() {

  return (
    <div className="app">

      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />

        <Route path="/movies" element={
          <>
            <Header isPageMovies />
            <Movies list={arrMovies} />
            <Footer />
          </>
        } />

        <Route path="/saved-movies" element={
          <>
            <Header isPageMovies />
            <Movies list={arrMovies} isSaveMovies />
            <Footer />
          </>
        } />

        <Route path="/profile" element={
          <>
            <Header isPageProfile />
            <Profile />
          </>
        } />

      </Routes>

    </div>
  );
}

export default App;
