import React, { useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";

import Main from "../Main/Main";
import Login from "../Login/Login";
import Register from "../Register/Register";

function App() {
  return (
    <div className="app">

      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
      </Routes>

    </div>
  );
}

export default App;
