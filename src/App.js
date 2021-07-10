import { Route, Switch, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';

import './App.css';

import Header from './components/Header/Header';
import Promo from './components/Promo/Promo';
import AboutProject from './components/AboutProject/AboutProject';
import Techs from './components/Techs/Techs';
import AboutMe from './components/AboutMe/AboutMe'
import Footer from './components/Footer/Footer';

import Login from './components/Login/Login';
import Register from './components/Register/Register';
import OverlayMenu from './components/OverlayMenu/OverlayMenu';

import MoviesPage from './components/MoviesPage/MoviesPage';
import SavedMoviesPage from './components/SavedMoviesPage/SavedMoviesPage';
import AccountPage from './components/AccountPage/AccountPage';
import PageNotFound from './components/PageNotFound/PageNotFound';

import auth from './utils/Api/Auth';
import mainApi from './utils/Api/MainApi';
import MoviesApi from './utils/Api/MoviesApi';  
// import functions from './utils/utils';

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import CurrentUserContext from './contexts/CurrentUserContext';

function App() {

  const isTokenPresent = Boolean(localStorage.getItem('jwt'));
  
  const [ user, setUser ] = useState({});
  
  const [ movies, setMovies ] = useState([]);
  
  const [ allBeatFilmMovies, setAllBeatFilmMovies ] = useState([]);

  const [ mySavedMovies, setMySavedMovies ] = useState([]);
  const [ mySavedMoviesFilteredByDuration, setMySavedMoviesFilteredByDuration ] = useState([]);
  
  const [ mySavedMoviesIDs, setMySavedMoviesIDs ] = useState([]);
  const [ isPreloaderShown, setPreloaderShown ] = useState(false);

  const [ isOverlayMenuOpen, handleOpenOverlayMenuClick ] = useState(false);
  const [ userLoggedIn, setUserLoggedIn] = useState(isTokenPresent);
  const [ moviesCountOnPage, setMoviesCountOnPage ] = useState(4);

  const [errorMessageTextLogin, setErrorMessageTextLogin] = useState('');
  const [errorMessageTextRegister, setErrorMessageTextRegister] = useState('');
  const [ errorMessageUpdateUser, setErrorMessageUpdateUser ] = useState('');
  
  const [ editProfileButtonShown, setEditProfileButtonShown ] = useState(true);
  const [ saveProfileButtonShown, setSaveProfileButtonShown ] = useState(false); 

  const [ shortFilmsFiltered, setShortFilmsFiltered] = useState(false);
  const [ mySavedMoviesShortFiltered, setMySavedMoviesShortFiltered] = useState(false);

  const [ shortFilmsFilterOn, switchshortFilmsFilterOn ] = useState(false);

  const history = useHistory();
  
  function closeAllpopups(){
    handleOpenOverlayMenuClick(false)
  }

  async function register(name, email, password){
    try {
      const res = await auth.register(name, email, password);
      if (res){
        history.push('/login');
        setErrorMessageTextRegister('');
        return;
      } else {
        if (res === 409) {
          setErrorMessageTextRegister('Пользователь с таким e-mail уже существует')
        } else if (res === 500){
          setErrorMessageTextLogin('При регистрации пользователя произошла ошибка');
        } else if (!res){
          setErrorMessageTextLogin('Неизвестная ошибка');
        }
        return res;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function login(email, password){
    try {
      const res = await auth.login(email, password);
      if (localStorage.getItem('jwt') === res.toString()) {
          setErrorMessageTextLogin('');
          setUserLoggedIn(true);
          history.push('/movies');
          return;
      } else {
      //console.log(res);
        if (res === 400){
          setErrorMessageTextLogin('Вы ввели некорректные данные');
        } else if (res === 401){
          setErrorMessageTextLogin('Вы ввели неправильный логин или пароль');
        } else if (res === 500){
          setErrorMessageTextLogin('На сервере произошла ошибка');
        } else if (!res) {
          setErrorMessageTextLogin('При авторизации произошла ошибка. Токен не передан или передан не в том формате');
        } 
        return res;
      }
    } catch (err) {
      console.log(err);
    }
  }


function showSaveProfileButton(){
  setSaveProfileButtonShown(true);
  setEditProfileButtonShown(false);
}

async function updateUser(name, email){
  const token = localStorage.getItem('jwt');
  try{
    const res = await mainApi.setUser(name, email, token);
    if (res) {
      setUser({ name: res.name, email: res.email });
      setSaveProfileButtonShown(false);
      setEditProfileButtonShown(true);
      return;
    } else {
      if (res === 400) {
        setErrorMessageUpdateUser('Введите корректные данные!');
      } else if (res === 409) {
        setErrorMessageUpdateUser('Пользователь с таким e-mail уже существует')
      } else if (res === 500){
        setErrorMessageUpdateUser('При обновлении профиля произошла ошибка');
      } else if (!res){
        setErrorMessageUpdateUser('Неизвестная ошибка');
      }
    }
  } catch (err) {
    console.log(err);
  }
}

function logout(){
  localStorage.removeItem('jwt');
  setUserLoggedIn(false);
  setUser({});
  history.push('/login');
  return;
}

  function saveMovie(movie){
    const token = localStorage.getItem('jwt');
    mainApi.saveMovie(movie, token)
    .then((data)=>{
      console.log(data);
      setMySavedMovies([data.savedMovie, ...mySavedMovies]);
      setMySavedMoviesIDs([data.savedMovie.movieId, ...mySavedMoviesIDs]);
      return data.savedMovie;
    }).catch((err)=>{
      console.log(err);
    })
  }

  function deleteSavedMovie(movieId){
    const token = localStorage.getItem('jwt');
    mainApi.deleteSavedMovie(movieId, token)
    .then((res)=>{
      setMySavedMovies(mySavedMovies.filter((movie) => !(movie._id === movieId)))
      // setMySavedMoviesFilteredByDuration(mySavedMoviesFilteredByDuration.filter((movie) => !(movie._id === movieId)))
      return res.deletedMovie;
    }).catch((err)=>{
      console.log(err);
    })
  };

  function toggleMoviesSavedStatus(movie){
    if (!mySavedMoviesIDs.includes(movie.id)){
      saveMovie(movie);
    } else if (mySavedMoviesIDs.includes(movie.id)){
      const currentSavedMovie = mySavedMovies.find((currentMovie)=> currentMovie.movieId === movie.id);
      setMySavedMoviesIDs(mySavedMoviesIDs.filter((id)=> !(id === currentSavedMovie.movieId)));
      deleteSavedMovie(currentSavedMovie._id);
    }
  }
/*
  function filterMoviesByDuration(moviesArray){
    if (shortFilmsFiltered === false){   
        setShortFilmsFiltered(true);
        const moviesFilteredByDuration = moviesArray.filter((movie)=> movie.duration < 40);
        return setMovies(moviesFilteredByDuration);
        //return moviesFilteredByDuration;
    } else if (shortFilmsFiltered === true){
        setShortFilmsFiltered(false);
        console.log(moviesArray)
        return setMovies(moviesArray);
        //return;
    }
  }
  */

  function filterMoviesByDuration(){
    if (shortFilmsFilterOn === false) {
      switchshortFilmsFilterOn(true)
      console.log('Filter: ', shortFilmsFilterOn)
    } else if (shortFilmsFilterOn === true) {
      switchshortFilmsFilterOn(false)
      console.log('Filter: ', shortFilmsFilterOn)
    }
  }

  function filterAndSearchMovies(input, moviesArray){
       
    if (shortFilmsFiltered === false){
      const foundMovies = moviesArray.filter((movie)=> movie.nameRU.toLowerCase().includes(input.toLowerCase()));
      setMovies(foundMovies);
      setShortFilmsFiltered(true)   
    } else if (shortFilmsFiltered === true){
      const moviesArrayForSearch = filterMoviesByDuration(moviesArray);
      const foundShortMovies = moviesArrayForSearch.filter((movie)=> movie.nameRU.toLowerCase().includes(input.toLowerCase()));
      setMovies(foundShortMovies);
      setShortFilmsFiltered(false);
    }
  };

  function regulateMoviesCountOnPage(i){
    setMoviesCountOnPage(moviesCountOnPage + i);
  };

  /*Функция добавления фильмов на страницу в зависимости от ширины экрана
    Она в зачаточном состоянии, позже переписать ее по-нормальному!
    Хук зависимости - выше!
  */
  
  function addMoviesToPage(){
    if (window.innerWidth > 1300 && window.innerWidth < 768){
      regulateMoviesCountOnPage(12);
    } else if (window.innerWidth < 999 && window.innerWidth > 669){
      regulateMoviesCountOnPage(3);
    } else if (window.innerWidth < 767 && window.innerWidth > 320){
      regulateMoviesCountOnPage(2);
    }
  }



  useEffect(() => {
    function checkToken(){
      if (isTokenPresent){
      setUserLoggedIn(true);
      auth.getContent(localStorage.getItem('jwt'))
        .then((data)=>{
          setUser({
            id: data.id,
            name: data.name,
            email: data.email
          })
        })
        .catch((err) => { console.log(err) });
      } else if (!isTokenPresent){
        setUserLoggedIn(false);
        setUser({});
      }
    }
    checkToken()
  }, [isTokenPresent]);

  useEffect(()=>{
    const token = localStorage.getItem('jwt');
    setPreloaderShown(true)
    if(userLoggedIn) {
      Promise.all([
        MoviesApi.getMovies(),
        mainApi.getUsersSavedMovies(token, user)
      ]).then(([moviesData, usersSavedMovies])=>{
       setAllBeatFilmMovies(moviesData)
       setMovies(moviesData);
       
      const currentIdsArray = usersSavedMovies.map((mySavedMovie)=>{return mySavedMovie.movieId})

      setMySavedMoviesIDs(currentIdsArray);
      setMySavedMovies(usersSavedMovies.reverse());

      }).catch((err)=>{
        console.log(err);
      });
    }
    setPreloaderShown(false)
  }, [userLoggedIn, moviesCountOnPage, user]);

  /*useEffect(()=>{
    if (shortFilmsFilterOn === true){
      const moviesFilteredByDuration = mySavedMovies.filter((movie)=> movie.duration < 40);
      setMySavedMovies(moviesFilteredByDuration) 
    } else if (shortFilmsFilterOn === false) {
      setMySavedMovies(mySavedMovies)
    }
  },[mySavedMovies, shortFilmsFilterOn]);*/




  return (
    <CurrentUserContext.Provider value={user}>
      <div className="App">
        <Switch>

          <Route exact path="/">
            <OverlayMenu 
              isOpen={isOverlayMenuOpen}
              isClosed={closeAllpopups}
            />
            <Header
              isLoggedIn={userLoggedIn}
              onOpenOverlayMenu={handleOpenOverlayMenuClick}
            />
            <Promo />
            <AboutProject />
            <Techs />
            <AboutMe />
            <Footer />
          </Route>

          <ProtectedRoute
            savedMoviesIds={mySavedMoviesIDs}
            exact path='/movies'
            component={MoviesPage}
            loggedIn={userLoggedIn}
            preloaderIsShown={isPreloaderShown}
            isOverlayMenuOpen={isOverlayMenuOpen}
            isOverlayMenuClosed={closeAllpopups}
            openOverlayMenu={handleOpenOverlayMenuClick}
            data={!shortFilmsFilterOn ? movies : movies.filter((movie)=> movie.duration < 40)}
            saveMovie={(movie)=>{toggleMoviesSavedStatus(movie)}}
            submitSearchForm={(input) => {filterAndSearchMovies(input, allBeatFilmMovies)}}
            filterShortFilms={()=>{filterMoviesByDuration()}}
            filterShortFilmsOn={shortFilmsFilterOn}
            addFilmsToPage={()=> addMoviesToPage()}
          />

          <ProtectedRoute
            exact path='/saved-movies'
            component={SavedMoviesPage}
            loggedIn={userLoggedIn}
            preloaderIsShown={isPreloaderShown}
            isOverlayMenuOpen={isOverlayMenuOpen}
            isOverlayMenuClosed={closeAllpopups}
            openOverlayMenu={handleOpenOverlayMenuClick}
            data={!shortFilmsFilterOn ? mySavedMovies: mySavedMovies.filter((movie)=> movie.duration < 40)}
            saveMovie={(movie)=> {deleteSavedMovie(movie._id)}}
            filterShortFilms={()=>{filterMoviesByDuration()}}
            filterShortFilmsOn={shortFilmsFilterOn}
            //submitSearchForm={(input) => filterAndSearchMySavedMovies(input, mySavedMovies)}
          />

          <ProtectedRoute
            exact path='/account'
            component={AccountPage}
            loggedIn={userLoggedIn}
            isOverlayMenuOpen={isOverlayMenuOpen}
            isOverlayMenuClosed={closeAllpopups}
            openOverlayMenu={handleOpenOverlayMenuClick}
            userName={user.name}
            userEmail={user.email}
            editUserProfile={(name, email)=>{updateUser(name, email)}}
            logout={()=>{console.log('Does logout work???'); logout()}}
            errorMessageText={errorMessageUpdateUser}
            showSaveProfileButton={()=> {showSaveProfileButton()}}
            editProfileButtonDisplayed={editProfileButtonShown}
            saveProfileButtonDisplayed={saveProfileButtonShown}

            // errorMessageText={errorMessageUpdateUser}
          />
          
          <Route exact path="/login">
              <Login 
                onLoginUser={login}
                errorMessageText={errorMessageTextLogin}
              />
          </Route>

          <Route exact path="/register">
              <Register
                onRegisterUser={register}
                errorMessageText={errorMessageTextRegister}
              />
          </Route>

          <Route exact path="*">
              <PageNotFound 
                notFoundLinkRoute='./movies'
              />
          </Route>

        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

/*
function toggleMoviesSavedStatus(movie){
    //console.log('IDs array: ', mySavedMoviesIDs);
    // console.log('This movie: ', movie.nameRU, 'ID: ', movie.id);
    // const movieIsSaved = Boolean(mySavedMoviesIDs.includes(movie.id));
    //console.log('This movie: ', movie.nameRU, 'IS SAVED: ', movieIsSaved);
    if (!mySavedMoviesIDs.includes(movie.id)){
      // console.log('This movie: ', movie.nameRU, 'IS SAVED! saved data: ', movie, 'IDs Array: ', mySavedMoviesIDs);
      saveMovie(movie);
      //setMySavedMoviesIDs(mySavedMoviesIDs.push(movie.id));
      // console.log('Movies IDs afther SAVING: ', mySavedMoviesIDs);
    } else if (mySavedMoviesIDs.includes(movie.id)){
      const currentSavedMovie = mySavedMovies.find((currentMovie)=> currentMovie.movieId === movie.id);
      console.log(currentSavedMovie);
      //console.log('Movie to delete: ', currentSavedMovie._id);
      // console.log('Movie to delete: ', currentSavedMovie.movieId);
      setMySavedMoviesIDs(mySavedMoviesIDs.filter((id)=> !(id === currentSavedMovie.movieId)));
      deleteSavedMovie(currentSavedMovie._id);
      //setMySavedMovies(mySavedMovies.filter((movie) => !(movie._id === movieId)))
    }
  }

  function setMoviesSavedStatus(movie){
  /*  console.log('Movie ID type:', typeof(movie.id));
    mySavedMoviesIDs.forEach(id =>{
      console.log('Array ID type: ', typeof(id));
    });  

    console.log(mySavedMoviesIDs);
    console.log('Type of array: ', typeof(mySavedMoviesIDs));

    const array = Array.from(mySavedMoviesIDs.toString());

    console.log(array);
  
    if (mySavedMoviesIDs.includes(movie.id)){
      console.log(movie.nameRU, ' saved!');
      return true;
    } else if (mySavedMoviesIDs === null || mySavedMoviesIDs === undefined) {
      console.log('Not saved');
      return false;
    } else {
      return false;
    }
  };
*/