import React, { useEffect, useState } from 'react';
import { sortMovies, filterSortShortMovies } from '../../utils/Common';

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
// import Sprite from '../../images/common/sprite.svg';
// import { apiMovies, api } from '../../utils/Api';

function SavedMovies({ ...props }) {
  const [savedMovies, setSavedMovies] = useState(props.savedMoviesList);
  const [searchSavedQuery, setSearchSavedQuery] = React.useState('');
  const [shortSavedMovies, setShortSavedMovies] = React.useState('off');
  const [filteredSavedMovies, setFilteredSavedMovies] = React.useState([]);

  const [isSearchError, setIsSearchError] = useState('');
  const [isNotFound, setIsNotFound] = useState(false);
  const [isLoadingMovies, setIsLoadingMovies] = useState(false);

  const checkIsSavedPageMovies = (props.isPageSaveMovies) ? true : false;

  useEffect(() => {
    const arr = props.savedMoviesList;
    if (arr.length) {
      setSavedMovies(arr);
    }
    // console.log(searchSavedQuery)
    // console.log(shortSavedMovies)
    // console.log('arr = ', arr);

    const newArr = sortMovies(arr, searchSavedQuery, shortSavedMovies, checkIsSavedPageMovies)
    // console.log(newArr)
    // console.log(`searchSavedQuery = ${searchSavedQuery}`);
    setFilteredSavedMovies(newArr)
    // setFilteredMovies(shortMovies === 'on' ? filterShortMovies(arr) : arr);
    // }, [shortMovies, movies, props.savedMoviesList]);
    // setFilteredSavedMovies(shortSavedMovies === 'on' ? filterSortShortMovies(arr) : arr);

  }, [savedMovies, shortSavedMovies, props.savedMoviesList]);

  function handleSubmit(e) {
    e.preventDefault();

    // setIsSearchError('');
    // setIsLoadingMovies(true);
    setSearchSavedQuery(searchSavedQuery);
    // console.log(`handleSubmit searchSavedQuery = ${searchSavedQuery}`);

    let movies = savedMovies;
    if (movies?.length && movies?.length !== 0) {
      // console.log('movies', movies);
      handleSortMovies(movies, searchSavedQuery, shortSavedMovies);
      setIsLoadingMovies(false);
    }



  }

  function handleSavedCheckbox(e) {
    const val = e.target.checked;
    // console.log(`val = ${val}`);

    if (val) {
      setShortSavedMovies('on');
    } else {
      setShortSavedMovies('off');
    }
  }


  function handleChangeSavedValue(e) {
    let val = e.target.value;
    // console.log('val = ' + val);
    setSearchSavedQuery(val);
  }

  function handleSortMovies(movies, query, checkbox) {
    const moviesList = sortMovies(movies, query, shortSavedMovies, checkIsSavedPageMovies);

    if (!moviesList.length) {
      // Нет ни одного фильма отвечающему запросу
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }

    let itemList = checkbox === 'on' ? filterSortShortMovies(moviesList) : moviesList;
    setFilteredSavedMovies(itemList);
    // localStorage.setItem('filteredMovies', JSON.stringify(itemList));
  }


  // React.useEffect(() => {
  //   const arr = filterMovies(list, searchSavedQuery, shortSavedMovies);
  //   setFilteredSavedMovies(arr);
  //   if (searchSavedQuery) {
  //     arr.length === 0 ? setIsNothingFound(true) : setIsNothingFound(false);
  //   }
  // }, [searchSavedQuery, shortSavedMovies, list]);

  return (
    <main className="content">
      <section className="movies" id="movies" aria-label="Фильмотека">
        <SearchForm
          savedMoviesPage={true}

          searchQuery={searchSavedQuery}
          handleSubmit={handleSubmit}
          shortMovies={shortSavedMovies}
          handleCheckbox={handleSavedCheckbox}
          handleChangeValue={handleChangeSavedValue}
        />

        <MoviesCardList
          isPageSaveMovies={props.isPageSaveMovies}

          list={filteredSavedMovies}
          setIsNotFound={props.setIsNotFound}
          savedMovies={props.savedMoviesList}

          onDelete={props.onDeleteClick}
        />
      </section>
    </main>
  );
};

export default SavedMovies;
