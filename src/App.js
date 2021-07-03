import { Route, Switch, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';

import './App.css';

import moviesArray from './utils/movies';

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

import functions from './utils/utils';

import auth from './utils/Api/Auth';
import mainApi from './utils/Api/MainApi';
import MoviesApi from './utils/Api/MoviesApi';  

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import CurrentUserContext from './contexts/CurrentUserContext';

function App() {

  const isTokenPresent = Boolean(localStorage.getItem('jwt'));
  
  const [ user, setUser ] = useState({});
  const [ movies, setMovies ] = useState([]);
  const [ mySavedMovies, setMySavedMovies ] = useState([]);
  const [ isOverlayMenuOpen, handleOpenOverlayMenuClick ] = useState(false);
  const [ userLoggedIn, setUserLoggedIn] = useState(isTokenPresent);
  const history = useHistory();
  
  function closeAllpopups(){
    handleOpenOverlayMenuClick(false)
  }

  function register(name, email, password){
    auth.register(name, email, password)
    .then((res) =>{
        history.push('/login');
        return res;
    })
    .catch((err)=> console.log(err));
  }

  function login(email, password){
    auth.login(email, password)
      .then((res)=>{
        if (localStorage.getItem('jwt') === res.toString()){
          // setUserLoggedIn(true);
          // console.log(`Logged In!: ${userLoggedIn}`);
          history.push('/movies');
          return;
        }
      }).catch((err)=>{
        console.log(`Ошибка входа: ${err}. Тип ошибки: ${err.name}`);
      });
  }

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

  function logout(){
    console.log('logout works!');
    localStorage.removeItem('jwt');
    setUserLoggedIn(false);
    history.push('/login');
    return;
  }

  /*
  Пока проблема решена так: залогиненность зависит от isTokenPresent!
  В перспективе это может вызвать глюки!
  Позже подумать, как это решить при помощи useEffect!
  */

  function saveMovie(data){
    console.log(data);
    mainApi.saveMovie(data)
      .then((movie)=>{
        return movie
      })
      .catch((err)=>{
        console.log(err);
      })
  }

  useEffect(() => {
    function checkToken(){
      if (isTokenPresent){
      auth.getContent(localStorage.getItem('jwt'))
        .then((data)=>{
          setUser({
            name: data.name,
            email: data.email
          })
        })
        .catch((err) => { console.log(err) });
      }
      setUserLoggedIn(true);
    }
    checkToken()
  }, [isTokenPresent]);

  useEffect(()=>{
    if(userLoggedIn) {
      Promise.all([
        MoviesApi.getMovies(),
        mainApi.getMySavedMovies(localStorage.getItem('jwt'))
      ]).then(([moviesData, savedMoviesData])=>{
        setMovies(moviesData);
        setMySavedMovies(savedMoviesData);
      }).catch((err)=>{
        console.log(err);
      });
    }
  }, [userLoggedIn]);

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
            isOverlayMenuOpen={isOverlayMenuOpen}
            isOverlayMenuClosed={closeAllpopups}
            openOverlayMenu={handleOpenOverlayMenuClick}
            data={movies}
            handleSaveMovie={saveMovie}
          />

          <ProtectedRoute
            exact path='/saved-movies'
            component={SavedMoviesPage}
            loggedIn={userLoggedIn}
            isOverlayMenuOpen={isOverlayMenuOpen}
            isOverlayMenuClosed={closeAllpopups}
            openOverlayMenu={handleOpenOverlayMenuClick}
            data={mySavedMovies}
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
            logout={logout}
          />
          
          <Route exact path="/login">
              <Login 
                onLoginUser={login}
              />
          </Route>

          <Route exact path="/register">
              <Register
                onRegisterUser={register}
              />
          </Route>

          <Route exact path="/not-found">
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
          
          <Route exact path="/beatfilm-movies">
            <Header 
              isLoggedIn={true}
              onOpenOverlayMenu={handleOpenOverlayMenuClick}
            />
            <SearchForm />
            <BeatFilmMoviesCardList 
              data={beatFilmMovies}
              addFilmsToPage={addMoviesToPage}
            />
            <Footer />
          </Route>
*/