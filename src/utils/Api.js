
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

    this._cardsUrl = this._url + '/cards';
    this._cardID = this._url + '/cards/';
    this._cardLikes = this._url + '/cards/cardId/likes';

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

  // addLike(data) {
  //   // console.log(`${this._url}/cards/${data._id}`);

  //   return fetch(`${this._url}/cards/${data._id}/likes`, {
  //     // credentials: 'include',
  //     // headers: this._headers,
  //     // headers: {
  //     //   authorization: `Bearer ${localStorage.getItem('jwt')}`
  //     // },
  //     headers: this._injectAuth(this._defaultHeaders),
  //     method: 'PUT',
  //   })
  //     .then(this._checkResponse)
  //     .catch((err) => {
  //       console.error('Ошибка! Ошибка лайка карточки');
  //     })
  // }

  // removeLike(data) {
  //   return fetch(`${this._url}/cards/${data._id}/likes`, {
  //     // credentials: 'include',
  //     // headers: this._headers,
  //     // headers: {
  //     //   authorization: `Bearer ${localStorage.getItem('jwt')}`
  //     // },
  //     headers: this._injectAuth(this._defaultHeaders),
  //     method: 'DELETE',
  //   })
  //     .then(this._checkResponse)
  //     .catch((err) => {
  //       console.error('Ошибка! Ошибка дизлайка карточки');
  //     })
  // }

  // toggleLike(data, isLiked) {
  //   if (isLiked) {
  //     return this.removeLike(data);
  //   } else {
  //     return this.addLike(data);
  //   }
  // }


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

  // setUserAvatar(data) {
  //   const url = `${this._url}/users/me/avatar`;

  //   return fetch(url, {
  //     // credentials: 'include',
  //     method: 'PATCH',
  //     // headers: this._headers,
  //     // headers: {
  //     //   'Content-Type': 'application/json',
  //     //   authorization: `Bearer ${localStorage.getItem('jwt')}`
  //     // },
  //     headers: this._injectAuth(this._defaultHeaders),
  //     body: JSON.stringify({
  //       avatar: data.avatar
  //     }),
  //   })
  //     .then(this._checkResponse)
  //     .catch((err) => {
  //       console.error('Ошибка! Ошибка при Добавлении новых данных о пользователе', err);
  //     })
  // }
}

const api = new Api({
  url: 'http://localhost:3000',
  // url: 'https://api.mmm.nomoredomainsrocks.ru',
});

export { apiMovies, api };
