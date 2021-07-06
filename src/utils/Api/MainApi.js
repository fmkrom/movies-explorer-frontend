import  URL from '../constants';

function checkRes(res) {
    if (res.ok) {
        // console.log(res);
        return res.json();
    } else {
      // console.log(res);
      Promise.reject(`Ошибка: ${res.statusText}`);
    }
}

async function setUser(email, name, token){
  try {
      const result = fetch(`${URL.MY_BASE}/users/me`, {
        method: 'PATCH',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
          email: email,
          name: name
        })
      })
    
      if (result.ok){
        const res = await result.json();
        console.log(res)
        return res;
      } else if (!result.ok){
        return result.status
      }
    } catch (err) {
      console.log(err);
    }
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

function deleteSavedMovie(movieId, token){
  return fetch(`${URL.MY_BASE}/movies/${movieId}`,
      {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      }).then(checkRes); 
}

function toggleMoviesSavedStatus(status, movie, token){
    if (status === false){
      saveMovie(movie, token)
    } else if (status === true) {
      deleteSavedMovie(movie, token)
    }
}

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
    getMySavedMovies,
    deleteSavedMovie,
    toggleMoviesSavedStatus
}

export default mainApi;
