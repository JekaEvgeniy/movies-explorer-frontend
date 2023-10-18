import React from "react";

import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props){

  return (
     props.list.map((item) => (
      <MoviesCard
        key={item.movieId}
        card={item}
      />
    ))
  );

}

export default MoviesCardList;
