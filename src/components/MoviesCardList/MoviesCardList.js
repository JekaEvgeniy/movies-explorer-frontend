import React, { useState } from "react";

import MoviesCard from '../MoviesCard/MoviesCard';


/*
  https://ru.react.js.org/docs/conditional-rendering.html
*/


function MoviesCardList({ ...props }) {

  // const [screenWidth, setScreenWidth] = useState(window.clientWidth || document.documentElement.clientWidth);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth || document.documentElement.clientWidth);
  const [renderMovies, setRenderMovies] = useState([]);
  const [visibleButtonMore, setVisibleButtonMore] = useState(true);
  const [numberElementsDisplay, setNumberElementsDisplay] = useState(0); // количество отображаемых элементов
  const [numberElementsAdd, setNumberElementsAdd] = useState(0); // количество добавляемых элементов
  const [visibleMovies, setVisibleMovies] = useState(true);
  const [isNotFound, setIsNotFound] = useState('');

  React.useEffect(() => {
    function handleResize() {

      const screenWidth = window.innerWidth || document.documentElement.clientWidth;
      // console.log(`screenWidth = ${screenWidth}`);
      setScreenWidth(screenWidth);
    }

    window.addEventListener("resize", function () {
      handleResize();
    });
  });

  React.useEffect(() => {
    if (screenWidth >= 1024) {
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
    // console.log(`isPageSaveMovies = ${props.isPageSaveMovies}`);

    const items = props.list;
    if (items && items.length) {
      // console.log('????');
      setVisibleMovies(true);
      setIsNotFound(false);
      setRenderMovies(props.list.slice(0, numberElementsDisplay));

      if (! props.isPageSaveMovies){
        setRenderMovies(props.list.slice(0, numberElementsDisplay));
      }else {
        setRenderMovies(props.list.slice());
      }

      if (items.length <= numberElementsDisplay) {
        hiddenBtnMore(false);
      } else {
        visibleBtnMore(true);
      };

    } else {
      // console.log('>>> нет элементов');
      setVisibleMovies(false);
      setIsNotFound(true);
      hiddenBtnMore();
    }

  }, [props.list, numberElementsDisplay]);

  function getSavedMovieCard(arr, id) {
    return arr.find((item) => {

      if (!props.isPageSaveMovies) {
        return item.movieId === id;
      }else {
        return item._id === id;
      }
    });
  };


  let movieCard;
  if (! props.isPageSaveMovies) {
    movieCard = renderMovies.map((item) => {
      const likedMovieCard = getSavedMovieCard(props.savedMovies, item.id);
      const likedMovieId = likedMovieCard ? likedMovieCard._id : null;

      return <MoviesCard
        isPageSaveMovies={props.isPageSaveMovies}
        key={item.id}
        // card={item}
        card={{ ...item, _id: likedMovieId }}
        liked={likedMovieCard ? true : false}
        onLike={props.onLike}
        onDelete={props.onDelete}
      />
    });

  } else {
    // console.log('> Navigate > МЫ находимся на странице /saved-movies;  props.savedMovies = ', props.savedMovies);

    if ( props.savedMovies ){
      // console.log('renderMovies = ', renderMovies);
      movieCard = renderMovies.map((item) => {
        const likedMovieCard = getSavedMovieCard(props.savedMovies, item._id);
        const likedMovieId = likedMovieCard ? likedMovieCard._id : null;

        return <MoviesCard
          isPageSaveMovies={props.isPageSaveMovies}
          key={item._id}
          // card={item}
          card={{ ...item, _id: likedMovieId }}
          liked={true}
          onDelete={props.onDelete}
        />

      });
    }
    // if ( 1 ){
    //   movieCard = props.savedMovies.map((item) => {

    //     return <MoviesCard
    //       isPageSaveMovies={props.isPageSaveMovies}
    //       key={item._id}
    //       // card={item}
    //       card={{ ...item, _id: item._id }}
    //       liked={true}
    //       onDelete={props.onDelete}
    //     />

    //   });
    // }
  }


    // console.log(`item.id = ${item.id}`);

    // if (props.isPageSaveMovies && ! likedMovieCard){
    //   // Если мы находимся на странице /saved-movies, то отрисовывать не лайкнутые карточки не нужно!
    //   return;
    // }





  function handleButtonMore() {
    // Когда загрузили все карточки, то нужно скрывать кнопку "Показать еще";

    setRenderMovies(props.list.slice(0, renderMovies.length + numberElementsAdd));
    if (renderMovies.length >= props.list.length - numberElementsAdd) {
      hiddenBtnMore();
    }
  }

  function hiddenBtnMore() {
    setVisibleButtonMore(false);
  };

  function visibleBtnMore() {
    setVisibleButtonMore(true);
  }

  function allMovies() {

    if (movieCard === undefined || movieCard === null){
      console.error('Ошибка в получении карточек: movieCard === undefined. См. строку 107 => return Card');
      return;
    }

    const checkItems = movieCard !== null && movieCard.length && movieCard.length > 0;
    // console.log(`checkItems = ${checkItems}`);
    // console.log('renderMovies => ', renderMovies);
    // console.log('<= renderMovies => ');
    // console.log(`MoviesCardList.js >>> renderMovies?.length = ${renderMovies?.length}; movieCard.length = ${movieCard.length} `);

    // console.log(`visibleMovies = ${visibleMovies}`);
    // console.log(`props.setIsNotFound = ${isNotFound}`);
    // console.log(`!visibleMovies || isNotFound ==== > ${!visibleMovies || isNotFound}`);

    if (checkItems){
      return (
        <>
          {
            visibleMovies && (
              <ul className="movies-items">
                {movieCard}
              </ul>
            )
          }
          {
            (!visibleMovies || isNotFound) && (
              <p className="movies__message movies__message_error">Ничего не найдено</p>
            )
          }

          {!props.isPageSaveMovies && visibleButtonMore && (
            <div className="movies__footer-actions">
              <button className="button-silver" type="button" onClick={handleButtonMore}>Ещё</button>
            </div>
          )}
        </>
      );
    } else {

      //console.log('Пользователь что-то искал и решил обновить страницу, но элементов нет. => показывем сообщение об ошибке.');
      let localStorageMovies = JSON.parse(localStorage.getItem('movies'));
      if (localStorageMovies ){
        if (! localStorageMovies.length) {
          return (
            <>
              <p className="movies__message movies__message_error">Ничего не найдено</p>
            </>
          );

        }
      }

    }
  }

  function likeMovies() {
    // return (
    //   renderMovies.filter(item => item.isLiked === true).map((item) => (
    //     <MoviesCard
    //       isPageSaveMovies={props.isPageSaveMovies}
    //       key={item.id}
    //       card={item}
    //       // onLike={props.onLike}
    //       onDelete={props.onDelete}
    //     />
    //   ))
    // );
  }


  if (props.isPageSaveMovies) {
    return allMovies();
  } else {
    return allMovies();
  }

}

export default MoviesCardList;
