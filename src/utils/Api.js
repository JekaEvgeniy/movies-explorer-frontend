
const apiMovies = () => {
  return fetch('https://api.nomoreparties.co/beatfilm-movies', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(checkResponse);
}

const checkResponse = (res) => {
  if (res.ok) return res.json();

  return Promise.reject(`error: ${res}`);
}

export { apiMovies };
