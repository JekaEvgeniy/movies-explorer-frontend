import React from "react";

function MoviesCard(props) {
  const card = props.card;
  const isLiked = props.liked;
  const movieTitle = card.nameRU;
  const movieDuration = card.duration;
  const moviePath = card.image.url || card.image;

  // Когда мы на странице избранного, пути у изображении другие оО
  const movieUrl = props.isPageSaveMovies ? moviePath : `https://api.nomoreparties.co/${moviePath}`;
  // const movieUrl = `https://api.nomoreparties.co/${moviePath}`;

  function handleLikeClick() {
    console.log(`handleLikeClick>>>`);
    props.onLike(card);
  };
  function handleDeleteClick() {
    console.log(`handleDeleteClick>>>`);
    props.onDelete(card);
  };


  function convertTimeDuration(value) {
    if (! value ){
      console.warn('Нет value!');
      return;
    }

    let result = '';
    const hours = Math.floor(value / 60);
    const minutes = value % 60;

    if (hours > 0) result += `${hours}ч `;
    if (minutes > 0) result += ` ${minutes}м`;

    return result;
  }

  let button;

  if (props.isPageSaveMovies ){
    // console.log('Мы находимся на странице saved-movies');

    button = <button className="movie__button-remove" type="button" name="button" aria-label="Удалить из избранного" onClick={handleDeleteClick}></button>;
  }else {
    // console.log('Мы находимся на странице movies');

    if (isLiked) {
      button = <button className="movie__button-save movie__button-save_active" type="button" name="button" aria-label="Удалить из избранного" onClick={handleDeleteClick}></button>;
    } else {
      // console.log(`isLiked = ${isLiked}`);
      button = <button className="movie__button-save" type="button" name="button" aria-label="Добавить в избранное" onClick={handleLikeClick}></button>;
    }
  }

  return (
    <li className="movies-items__item" key={props.id}>
      <article className="movie">
        <div className="movie__header">
          <div className="movie__group">
            <h2 className="movie__title">{movieTitle}</h2>
            <p className="movie__duration">{convertTimeDuration(movieDuration)}</p>
          </div>
          <div className="movie__actions">
            {button}
          </div>
        </div>
        <figure className="movie__figure">
          <img className="movie__image image-cover" src={movieUrl} loading="lazy" alt={movieTitle} />
        </figure>
      </article>
    </li>
  );
}

export default MoviesCard;
