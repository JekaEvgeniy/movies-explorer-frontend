import React, { useEffect, useState } from 'react';
import { sortMovies, filterSortShortMovies } from '../../utils/Common';

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

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

    const newArr = sortMovies(arr, searchSavedQuery, shortSavedMovies, checkIsSavedPageMovies)
    setFilteredSavedMovies(newArr)

  }, [savedMovies, shortSavedMovies, props.savedMoviesList]);

  function handleSubmit(e) {
    e.preventDefault();

    setSearchSavedQuery(searchSavedQuery);

    let movies = savedMovies;

    if (movies?.length && movies?.length !== 0) {
      handleSortMovies(movies, searchSavedQuery, shortSavedMovies);
      setIsLoadingMovies(false);
    }
  }

  function handleSavedCheckbox(e) {
    const val = e.target.checked;

    if (val) {
      setShortSavedMovies('on');
    } else {
      setShortSavedMovies('off');
    }
  }


  function handleChangeSavedValue(e) {
    let val = e.target.value;
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
