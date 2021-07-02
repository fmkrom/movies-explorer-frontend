import URL from '../constants';

class Api {
  constructor(settings){
      this._url = settings.url;
      this._token = settings.token;
  }

  getRes(res){
      if (res.ok) {
        console.log(res);
        return res.json();
      } else {
        return Promise.reject(`Ошибка получения данных с сервера: ${res.status}`);
      }
  };
  
  getMovies(){
    return fetch(`${this._url}`,
    {
     method: 'GET',
     headers: {
      'Content-Type': 'application/json',
      },
    }).then(this.getRes);
  };

  //1. Получить данные карточек
  
  getCards(token){
    return fetch(`${this._url}/cards`,
    {
     method: 'GET',
     // mode: 'no-cors',
     headers: {
      authorization: `Bearer ${token}`, 
      'Content-Type': 'application/json',
      },
    }).then(this.getRes);
  };

  //2. Добавить карточку
  addCard(name, url, token){
    return fetch(`${this._url}/cards`,
      {
      method: 'POST',
      // mode: 'no-cors',
      headers:{
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
        }, 
        body:JSON.stringify({
            name: name,
            link: url
        })
      }
    ).then(this.getRes);
  };

   //Промежуточный метод: установить лайк-статус
    setCardLikeStatus(status){
        if (status === true){
          return 'PUT'
        } else {
          return 'DELETE'
        }
    }

    //Применение лайк-статуса к методу лайка карточки:
    toggleLikeCard(cardId, likeStatus, token){
      return fetch(`${this._url}/cards/${cardId}/likes`,
        {
          method: likeStatus ? "PUT" : "DELETE",
          // mode: 'no-cors',
          headers:{
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        }
      ).then(this.getRes)
    };

  //Удалить карточку
  deleteCard(cardId, token){
    return fetch(`${this._url}/cards/${cardId}`,
      {
        method: "DELETE",
        // mode: 'no-cors',
        headers:{
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    ).then(this.getRes);
  };

  //Методы пользователя

  //Получить данные пользователя
  getUser(token){
    return fetch(`${this._url}/users/me`,
      {
        method: 'GET',
        // mode: 'no-cors',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      }
    ).then(this.getRes)
  };
  
  //Установить новые ДП
  setUser(data, token){
    return fetch(`${this._url}/users/me`,
      {
        method: 'PATCH',
        // mode: 'no-cors',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
          name: data.name,
          about: data.about
        })
    }).then(this.getRes)
  };

  //Редактировать аватар
  editAvatar(url, token){
    return fetch(`${this._url}/users/me/avatar`,
    {
      method: 'PATCH',
      // mode: 'no-cors',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({
        avatar: url
      })
    }
    ).then(this.getRes)
  };
}

const apiSettings = {
  url: URL.BEATFILM_MOVIES,
};  

const MoviesApi = new Api(apiSettings);

export default MoviesApi;
