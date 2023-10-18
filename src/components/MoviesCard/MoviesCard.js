import React from "react";

function MoviesCard(props) {
  return (
    <li className="movies-items__item" key={props.movieId}>
      <article className="movie">
        <div className="movie__header">
          <div className="movie__group">
            <h2 className="movie__title">33 слова о дизайне</h2>
            <p className="movie__duration">1ч 47м</p>
          </div>
          <div className="movie__actions">
            <button className="movie__button-save" type="button" name="button" aria-label="Добавить в избранное"></button>
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
