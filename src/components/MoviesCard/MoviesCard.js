import React from "react";

function MoviesCard(props) {
  const isLiked = props.card.isLiked;
  let button;

  if (props.isSaveMovies ){
    // console.log('Мы находимся на странице saved-movies');
    button = <button className="movie__button-remove" type="button" name="button" aria-label="Удилть из избранного"></button>;
  }else {
    // console.log('Мы находимся на странице movies');
    if (isLiked) {
      button = <button className="movie__button-save movie__button-save_active" type="button" name="button" aria-label="Удилть из избранного"></button>;
    } else {
      button = <button className="movie__button-save" type="button" name="button" aria-label="Добавить в избранное"></button>;
    }
  }



  return (
    <li className="movies-items__item" key={props.movieId}>
      <article className="movie">
        <div className="movie__header">
          <div className="movie__group">
            <h2 className="movie__title">33 слова о дизайне</h2>
            <p className="movie__duration">1ч 47м</p>
          </div>
          <div className="movie__actions">
            {button}
          </div>
        </div>
        <figure className="movie__figure">
          <img className="movie__image image-cover" src={props.card.image} loading="lazy" alt="Заголовок" />
        </figure>
      </article>
    </li>
  );
}

export default MoviesCard;
