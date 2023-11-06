import React, { useState } from "react";

import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ ...props }) {

  // const [screenWidth, setScreenWidth] = useState(window.clientWidth || document.documentElement.clientWidth);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth || document.documentElement.clientWidth);
  const [renderMovies, setRenderMovies] = useState([]);
  const [visibleButtonMore, setVisibleButtonMore] = useState(true);
  const [numberElementsDisplay, setNumberElementsDisplay] = useState(0); // количество отображаемых элементов
  const [numberElementsAdd, setNumberElementsAdd] = useState(0); // количество добавляемых элементов

  /**
    * Ширина >1024px — 3 в ряд и 4 ряда карточек (3*4). Кнопка «Ещё» загружает 3 карточки
    * Ширина 768px-1023 — 2 карточки и 4 ряда (2*4). Кнопка «Ещё» загружает 2 карточки
    * Ширина 320-767 — 1 карточка и 5 рядов (1*5). Кнопка «Ещё» загружает 2 карточки
    *
    * Поиск "да" => 9 (1 short) //
    * Поиск "part" => 1 elem
    * Поиск "all" => 6 elems
    * Поиск "ал" => 7 elems
    * Поиск "по" => 4 elems (1 short)
    * Поиск "га" => 2 elems (1 short)
    * Поиск "й" => 19 elems (2 short)
  */

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

  React.useEffect(() => {
    if (screenWidth >= 1024){
      setNumberElementsDisplay(12);
      setNumberElementsAdd(3);
    } else if (screenWidth >= 768 && screenWidth < 1024) {
      setNumberElementsDisplay(8);
      setNumberElementsAdd(2);
    } else if (screenWidth < 768) {
      setNumberElementsDisplay(5);
      setNumberElementsAdd(2);
    }
  }, [screenWidth]);

  React.useEffect(() => {
    const items = props.list;

    if (items) {
      console.log(`items.length = ${items.length}`);

      setRenderMovies(props.list.slice(0, numberElementsDisplay));

      if (items.length <= numberElementsDisplay) {
        hiddenBtnMore(false);
      } else {
        visibleBtnMore(true);
      };

    } else {
      hiddenBtnMore();
    }

  }, [props.list, numberElementsDisplay]);

  const movieCard = renderMovies.map((item) => {
    return <MoviesCard
      key={item.id}
      card={item}
    />
  });


  function handleButtonMore(){
    // Когда загрузили все карточки, то нужно скрывать кнопку "Показать еще";
    // const count = (screenWidth >= 1024) ? 3 : 2;
    // setRenderMovies(props.list.slice(0, renderMovies.length + count ) );

    setRenderMovies(props.list.slice(0, renderMovies.length + numberElementsAdd));
    if (renderMovies.length >= props.list.length - numberElementsAdd) {
      hiddenBtnMore();
    }
  }

  function hiddenBtnMore(){
    setVisibleButtonMore(false);
  };

  function visibleBtnMore(){
    setVisibleButtonMore(true);
  }

  function allMovies() {

    const checkItems = movieCard.length && movieCard.length > 0;
    if (checkItems) {
      // console.log(`MoviesCardList.js >>> renderMovies?.length = ${renderMovies?.length}; movieCard.length = ${movieCard.length} `);
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
