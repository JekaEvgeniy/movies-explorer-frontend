function sortMovies(movies, searchQuery, shortMovies, checkIsSavedPageMovies) {
  let filteredMoviesArray = [];

  if (typeof movies === 'string'){
    movies = JSON.parse(movies);
  }

  if (movies !== null && movies.length > 0) {
    // const items = movies;
    // const items = JSON.parse(movies);
    // console.log('items', movies);

    filteredMoviesArray = movies.filter((item) => {
      const nameRU = item.nameRU.toUpperCase().includes(searchQuery.toUpperCase());
      const nameEN = item.nameEN.toUpperCase().includes(searchQuery.toUpperCase());

      return nameRU || nameEN;
    });


    if (! checkIsSavedPageMovies ){
      localStorage.setItem('filteredMovies', JSON.stringify(filteredMoviesArray));
    }
  }

  if (shortMovies === 'on') {
    filteredMoviesArray = filteredMoviesArray.filter(movie => movie.duration <= 40);
  }

  return filteredMoviesArray;
}

function filterSortShortMovies(movies) {
  if (movies !== null && movies.length > 0) {
    const getShortMovies = movies.filter((item) => item.duration <= 40);
    console.log('getShortMovies = ', getShortMovies);
    return getShortMovies;
  }

};

export {
  sortMovies,
  filterSortShortMovies,
};
