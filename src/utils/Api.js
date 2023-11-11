
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


class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;

    this._cardsUrl = this._url + '/movies';
    // this._cardID = this._url + '/movies/';
    // this._cardLikes = this._url + '/movies/cardId/likes';

    this._userUrl = this._url + '/users/me';

    this._defaultHeaders = { 'Content-Type': 'application/json' };
  }

  _injectAuth(headers = {}) {
    return { ...headers, authorization: `Bearer ${localStorage.getItem('jwt')}` };
  }

  setToken(token) {
    this._headers.authorization = `Bearer ${token}`;
  }

  _checkResponse(res) {
    // Проверка статуса ответа сервера

    if (res.ok) return res.json()

    return Promise.reject('Promise reject error');
  }

  /*
  * Работаем с карточками
  */

  getUsersMovies() {
    return fetch(this._cardsUrl, {
      // headers: {
      //   authorization: this._token,
      // },
      // credentials: 'include',
      headers: this._injectAuth(this._defaultHeaders),
    })
      .then(res => {
        // console.log('res2', res);

        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка getUsersMovies(): ${res.status}`);
      })
  };


  saveNewMovie({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    id,
  }) {
    // console.log(
    //   `api.js >>> saveNewMovie >>> country = ${country}; director = ${director}; duration = ${duration}; year = ${year}; description = ${description}; image = ${`https://api.nomoreparties.co${image.url}`}; trailerLink = ${trailerLink}; nameRU = ${nameRU}; nameEN = ${nameEN}; thumbnail = ${`https://api.nomoreparties.co${image.url}`}; id = ${id};
    //   `
    // );

    return fetch(this._cardsUrl, {
      method: 'POST',
      headers: this._injectAuth(this._defaultHeaders),
      body: JSON.stringify({
        country: country || '',
        director: director || '',
        duration: duration || '',
        year: year || '',
        description: description || '',
        image: `https://api.nomoreparties.co${image.url}` || '',
        trailerLink: trailerLink || '',
        thumbnail: `https://api.nomoreparties.co${image.formats.thumbnail.url}` || `https://api.nomoreparties.co${image.url}` || '',
        movieId: id,
        // movieId: movieId,
        nameRU: nameRU || '',
        nameEN: nameEN || '',
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка saveNewMovie: ${res.status}`);
      })
  };

  deleteMovie(id) {
    console.log(`id = ${id}`);
    // return fetch(`${this._cardsUrl}/${movieId}`, {
    return fetch(`${this._cardsUrl}/${id}`, {
      method: 'DELETE',
      headers: this._injectAuth(this._defaultHeaders),
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  };

  /*
  * Работаем с инфополем
  */

  getUserInfo() {
    return fetch(this._userUrl, {
      method: "GET",
      // headers: this._headers,
      // credentials: 'include',
      // headers: {
      //   authorization: `Bearer ${localStorage.getItem('jwt')}`
      // },
      headers: this._injectAuth(this._defaultHeaders),
    })
      .then(this._checkResponse)
      .catch((err) => {
        console.error(`Ошибка! Ошибка при получении данных о пользователе: ${err}`);
      })
  }

  // setUserInfo({ name, email }) {
  setUserInfo( data ) {
    return fetch(`${this._url}/users/me`, {
      // credentials: 'include',
      method: 'PATCH',
      // headers: this._headers,
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      // headers: this._injectAuth(this._defaultHeaders),
      // body: JSON.stringify({ name, email }),
      body: JSON.stringify({
        name: data.name,
        email: data.email
      }),
    })
      .then(this._checkResponse)
      .catch((err) => {
        console.error('Ошибка! Ошибка при Добавлении новых данных о пользователе', err);
      })
  }
}

const api = new Api({
  url: 'http://localhost:3000',
  // url: 'https://api.mmm.nomoredomainsrocks.ru',
});

export { apiMovies, api };
