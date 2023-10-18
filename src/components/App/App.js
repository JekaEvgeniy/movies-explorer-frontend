import React, { useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";

import Main from "../Main/Main";

function App() {
  return (
    <div className="app">

      <Routes>
        <Route exact path="/" element={<Main />} />
      </Routes>

    </div>
  );
}

export default App;
