import  URL from '../constants';

function checkRes(res) {
    if (res.ok) {
        console.log(res);
        return res.json();
    } else {
      // console.log(res);
      Promise.reject(`Ошибка: ${res.statusText}`);
    }
}

function setUser(name, email, token){
    return fetch(`${URL.MY_BASE}/users/me`,
      {
        method: 'PATCH',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
          name: name,
          email: email
        })
    }).then(checkRes);
};

function saveMovie(movie, token){
  return fetch(`${URL.MY_BASE}/movies`,
      {
        method: 'POST',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
          movieId: movie.id,
          country: movie.country,
          director: movie.director,
          duration: movie.duration,
          year: movie.year,
          description: movie.description,
          image: `https://api.nomoreparties.co${movie.image.url}`, 
          trailer: movie.trailerLink,
          nameRU: movie.nameRU,
          nameEN: movie.nameEN,
          thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`
        })
      }).then(checkRes);
};

function getMySavedMovies(token){
  return fetch(`${URL.MY_BASE}/movies`,
  {
   method: 'GET',
   headers: {
    authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    },
  }).then(checkRes);
};

const mainApi = {
    setUser,
    saveMovie,
    getMySavedMovies
}

export default mainApi;
