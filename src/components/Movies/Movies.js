import React from "react";

import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ list }){
  return (
    <section className="movies" id="movies" aria-label="Фильмотека">
      <ul className="movies-items">
        <MoviesCardList list={list} />
      </ul>


      <div className="movies__footer-actions">
        <button className="button-silver" type="button">Ещё</button>
      </div>

    </section>
  );
}

export default Movies;
