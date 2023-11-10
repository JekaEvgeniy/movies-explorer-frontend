import React from "react";

import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function Movies({ ...props }) {

  console.log('props.list222222', props.list);
  console.log('props.savedFilteredMovies', props.savedFilteredMovies);

  return (
    <section className="movies" id="movies" aria-label="Фильмотека">
      <MoviesCardList
        list={props.list}
        isPageSaveMovies={props.isPageSaveMovies}
        setIsNotFound={props.setIsNotFound}

        savedMovies={props.list}
        onDelete={props.onDeleteClick}
        savedFilteredMovies={props.savedFilteredMovies}
      />

      {props.isLoadingMovies && (
        <Preloader />
      )}
    </section>
  );
}

export default Movies;
