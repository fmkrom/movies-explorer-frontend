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
import Preloader from './components/Preloader/Preloader';

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import CurrentUserContext from './contexts/CurrentUserContext';

function App() {

  const isTokenPresent = Boolean(localStorage.getItem('jwt'));
  
  const [ user, setUser ] = useState({});
  const [ movies, setMovies ] = useState([]);
  const [ allBeatFilmMovies, setAllBeatFilmMovies ] = useState([]);
  const [ mySavedMovies, setMySavedMovies ] = useState([]);
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

  console.log('Edit profile button displayed: ', editProfileButtonShown);
  console.log('Saved profile button displayed: ', saveProfileButtonShown);

  const history = useHistory();
  
  function closeAllpopups(){
    handleOpenOverlayMenuClick(false)
  }

  async function register(name, email, password){
    try {
      const res = await auth.register(name, email, password)
      if (res.ok){
        history.push('/login');
        return res;
      } else if (!res.ok) {
        console.log(res) 
        if (res === 409) {
          setErrorMessageTextRegister('Пользователь с таким e-mail уже существует')
        } else if (res === 500){
          setErrorMessageTextLogin('При регистрации пользователя произошла ошибка');
        } else if (!res){
          setErrorMessageTextLogin('Неизвестная ошибка');
        }
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
        console.log(res);
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

/*важно! Я переписал бэк так чтобы он возвращал id пользователя
  Надо фильтровать сохраненные фильмы по этому id!!
*/

function showSaveProfileButton(){
  setSaveProfileButtonShown(true);
  setEditProfileButtonShown(false);
}

async function updateUser(name, email){
  const token = localStorage.getItem('jwt');
  try{
    const res = await mainApi.setUser(name, email, token);
    if (res) {
      console.log(res.name, res.email);
      setUser({ name: res.name, email: res.email });
      setSaveProfileButtonShown(false);
      setEditProfileButtonShown(true);
      return;
    } else {
      console.log(res);
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
  console.log('logout works!');
  localStorage.removeItem('jwt');
  setUserLoggedIn(false);
  history.push('/login');
  return;
}

  /*
  ВАЖНО!  Пока в этой функции баг:
  Сохраненный фильм появляется на странице не сразу!
  В перспективе - исправить это!
  */

  function saveMovie(movie){
    console.log(movie);
    const token = localStorage.getItem('jwt');
    mainApi.saveMovie(movie, token)
    .then((data)=>{
      setMySavedMovies([data.savedMovie, ...mySavedMovies])
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
      return res.deletedMovie;
    }).catch((err)=>{
      console.log(err);
    })
  };

  function getSavedMoviesIDs(savedMovies){
    const IdsArray = savedMovies.map((mySavedMovie)=>{return mySavedMovie.movieId})
    setMySavedMoviesIDs(IdsArray);
  };

  function toggleMoviesSavedStatus(movie){
    if (!mySavedMoviesIDs.includes(movie.id)){
      saveMovie(movie);
    } else if (mySavedMoviesIDs.includes(movie.id)){
      const currentSavedMovie = mySavedMovies.find((currentMovie)=> currentMovie.movieId === movie.id);
      deleteSavedMovie(currentSavedMovie._id);
    }
  }

  /*
    ВАЖНО! Все работает, но пока только после перезагрузки страницы. 
    Исправить этот баг!
  */

  function setMoviesSavedStatus(movie){
    if (!mySavedMoviesIDs.includes(movie.id)){
      return true;
    } else {
      return false;
    }
  };
 
  //Поиск
  function searchMovies(input){
    const newMoviesArray = allBeatFilmMovies.filter((movie) => 
      movie.nameRU.toLowerCase().includes(input.toLowerCase())
    )
    setMovies(newMoviesArray);
  }

  function searchSavedMovies(input){
    const newSavedMoviesArray = mySavedMovies.filter((movie) => 
      movie.nameRU.toLowerCase().includes(input.toLowerCase())
    )
    setMySavedMovies(newSavedMoviesArray);
  }


  function regulateMoviesCountOnPage(i){
    setMoviesCountOnPage(moviesCountOnPage + i);
  }

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
            name: data.name,
            email: data.email
          })
        })
        .catch((err) => { console.log(err) });
      } else if (!isTokenPresent){
        setUserLoggedIn(false);
      }
    }
    checkToken()
  }, [isTokenPresent]);

  useEffect(()=>{
    setPreloaderShown(true)
    if(userLoggedIn) {
      Promise.all([
        MoviesApi.getMovies(),
        mainApi.getMySavedMovies(localStorage.getItem('jwt'))
      ]).then(([moviesData, savedMoviesData])=>{
        const slicedMoviesArray = moviesData.slice(0, moviesCountOnPage);
        setAllBeatFilmMovies(moviesData)
        setMovies(slicedMoviesArray);
        getSavedMoviesIDs(savedMoviesData);
        setMySavedMovies(savedMoviesData.reverse());
      }).catch((err)=>{
        console.log(err);
      });
    }
    setPreloaderShown(false)
  }, [userLoggedIn, moviesCountOnPage]);

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
            exact path='/movies'
            component={MoviesPage}
            loggedIn={userLoggedIn}
            preloaderIsShown={isPreloaderShown}
            isOverlayMenuOpen={isOverlayMenuOpen}
            isOverlayMenuClosed={closeAllpopups}
            openOverlayMenu={handleOpenOverlayMenuClick}
            data={movies}
            isSaved={setMoviesSavedStatus}
            saveMovie={(movie)=>{toggleMoviesSavedStatus(movie)}}
            submitSearchForm={(input) => searchMovies(input)}
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
            data={mySavedMovies}
            isSaved={setMoviesSavedStatus}
            saveMovie={(movie)=> {deleteSavedMovie(movie._id)}}
            submitSearchForm={(input) => searchSavedMovies(input)}
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
            updateUser={updateUser}
            logout={()=>{logout()}}
            errorMessageText='Здесь ошибка!'
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
  function register(name, email, password){
    auth.register(name, email, password)
    .then((res) =>{
        history.push('/login');
        return res;
    })
    .catch((err)=> console.log(err));
  }

  /*
function updateUser(name, email){
    const token = localStorage.getItem('jwt');
    mainApi.setUser(name, email, token)
    .then((data)=>{
      console.log(data)
      setUser({
        name: data.name,
        email: data.email
      })
    }).catch((err) => {console.log(err)});
  }

function login(email, password){
    auth.login(email, password)
      .then((res)=>{
        if (localStorage.getItem('jwt') === res.toString()){
          setUserLoggedIn(true);
          history.push('/movies');
          return;
        }
      }).catch((err)=>{
        console.log(err);
        if(err.status === 401){
          setErrorMessageTextLogin('Ошибка авторизации: введите правильный логин и пароль');
        } else {
          console.log(`Ошибка входа: ${err}. Тип ошибки: ${err.name}`);
        }
      });
  }
  */