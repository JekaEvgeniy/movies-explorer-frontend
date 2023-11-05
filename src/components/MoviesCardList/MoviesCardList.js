import React, { useState } from "react";

import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ ...props }) {

  // const [screenWidth, setScreenWidth] = useState(window.clientWidth || document.documentElement.clientWidth);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth || document.documentElement.clientWidth);
  const [renderMovies, setRenderMovies] = useState([]);
  const [visibleButtonMore, setVisibleButtonMore] = useState(true);


  React.useEffect(() => {
    function handleResize() {

      const screenWidth = window.innerWidth || document.documentElement.clientWidth;
      console.log(`screenWidth = ${screenWidth}`);
      setScreenWidth(screenWidth);
    }

    window.addEventListener("resize", function () {
      handleResize();
    });
  });

  /**
    * Ширина >1024px — 3 в ряд и 4 ряда карточек (3*4). Кнопка «Ещё» загружает 3 карточки
    * Ширина 768px-1023 — 2 карточки и 4 ряда (2*4). Кнопка «Ещё» загружает 2 карточки
    * Ширина 320-767 — 1 карточка и 5 рядов (1*5). Кнопка «Ещё» загружает 2 карточки
  */

  React.useEffect(() => {
    const items = props.list;
    if (items) {
      const itemsAmount = items.length;
      // console.log(`itemsAmount = ${itemsAmount}`);
      console.log(`MoviesCardList.js >>> screenWidth = ${screenWidth}`);

      if (itemsAmount > 3 && screenWidth >= 1024) {
        setRenderMovies(items.slice(0, 12));
      } else if (screenWidth >= 768 && screenWidth < 1024) {
        setRenderMovies(items.slice(0, 8));
      } else if (screenWidth < 768) {
        setRenderMovies(items.slice(0, 5));
      } else {
        setRenderMovies(items);
      }
    } else {
      setVisibleButtonMore(false);
    }

  }, [props.list, screenWidth]);

  const movieCard = renderMovies.map((item) => {
    return <MoviesCard
      key={item.id}
      card={item}
    />
  });


  function handleButtonMore(){
    const count = (screenWidth >= 1024) ? 3 : 2;
    console.log(`click >>> handleButtonMore(); count = ${count}`);
    setRenderMovies(props.list.slice(0, renderMovies.length + count ) );

    // Когда загрузили все карточки, то нужно скрывать кнопку "Показать еще";
    toggleButtonMore();
  }

  function toggleButtonMore(){
    if (renderMovies.length >= props.list.length) {
      setVisibleButtonMore(false);
    } else {
      setVisibleButtonMore(true);
    }
  }

  function allMovies() {
    console.log(`renderMovies?.length = ${renderMovies?.length}`);

    const checkItems = movieCard.length && movieCard.length > 0;
    if (checkItems) {
      return (
        <>
          <ul className="movies-items">
            {movieCard}
          </ul>

          {!props.isSaveMovies && visibleButtonMore && (
            <div className="movies__footer-actions">
              <button className="button-silver" type="button" onClick={handleButtonMore}>Ещё</button>
            </div>
          )}
        </>
      );
    } else {
      return (
        <>
          {!props.isSaveMovies && (
            <h2>Нет элементов!</h2>
          )}
        </>
      );
    }

  }










  function likeMovies() {
    return (
      renderMovies.filter(item => item.isLiked === true).map((item) => (
        <MoviesCard
          isSaveMovies={props.isSaveMovies}
          key={item.id}
          card={item}
        />
      ))
    );
  }

  if (props.isSaveMovies) {
    // return likeMovies();
  } else {
    return allMovies();
  }
}

export default MoviesCardList;
