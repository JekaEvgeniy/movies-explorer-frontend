import React from "react";

import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({...props}){

  function allMovies(){
    return (
       props.list.map((item) => (
        <MoviesCard
          key={item.movieId}
          card={item}
        />
      ))
   );
  }

  function likeMovies(){
    return (
      props.list.filter(item => item.isLiked === true ).map((item) => (
        <MoviesCard
          isSaveMovies={props.isSaveMovies}
          key={item.movieId}
          card={item}
        />
      ))
    );
  }

  if ( props.isSaveMovies ){
    return likeMovies();
  }else {
    return allMovies();
  }
}

export default MoviesCardList;
