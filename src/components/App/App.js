import React, { useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";

import Main from "../Main/Main";
import Login from "../Login/Login";
import Register from "../Register/Register";
import {arrMovies} from '../../utils/arrMovies'
import Movies from "../Movies/Movies";


function App() {
  return (
    <div className="app">

      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/movies" element={
          <Movies list={arrMovies} />
        } />

      </Routes>

    </div>
  );
}

export default App;
