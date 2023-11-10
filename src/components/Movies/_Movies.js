import React from "react";

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function Movies({ ...props }) {

  return (
    <section className="movies" id="movies" aria-label="Фильмотека">
      <MoviesCardList
        list={props.list}
        isPageSaveMovies={props.isPageSaveMovies}
        setIsNotFound={props.setIsNotFound}

        savedMovies={props.savedMoviesList}
        onLike={props.onLikeClick}
        onDelete={props.onDeleteClick}
      />

      {props.isLoadingMovies && (
        <Preloader />
      )}
    </section>
  );

  // return (
  //   <section className="movies" id="movies" aria-label="Фильмотека">
  //     <ul className="movies-items">
  //       <MoviesCardList list={props.list} isPageSaveMovies={props.isPageSaveMovies} />
  //     </ul>

  //     {!props.isPageSaveMovies && (
  //       <div className="movies__footer-actions">
  //         <button className="button-silver" type="button">Ещё</button>
  //       </div>
  //     )}
  //   </section>
  // );
}

export default Movies;
