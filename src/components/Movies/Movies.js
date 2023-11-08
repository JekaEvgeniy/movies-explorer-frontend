import React from "react";

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function Movies({ ...props }) {

  return (
    <section className="movies" id="movies" aria-label="Фильмотека">
      <MoviesCardList
        list={props.list}
        isSaveMovies={props.isSaveMovies}
        setIsNotFound={props.setIsNotFound}
      />

      {props.isLoadingMovies && (
        <Preloader />
      )}
    </section>
  );

  // return (
  //   <section className="movies" id="movies" aria-label="Фильмотека">
  //     <ul className="movies-items">
  //       <MoviesCardList list={props.list} isSaveMovies={props.isSaveMovies} />
  //     </ul>

  //     {!props.isSaveMovies && (
  //       <div className="movies__footer-actions">
  //         <button className="button-silver" type="button">Ещё</button>
  //       </div>
  //     )}
  //   </section>
  // );
}

export default Movies;
