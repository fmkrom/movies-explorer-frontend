import { Route, } from 'react-router-dom';
import { BrowserRouter, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';

import './App.css';

import Header from './components/Header/Header';
import Promo from './components/Promo/Promo';
import AboutProject from './components/AboutProject/AboutProject';
import Techs from './components/Techs/Techs';
import AboutMe from './components/AboutMe/AboutMe'
import Footer from './components/Footer/Footer';

import SearchForm from './components/SearchForm/SearchForm';
import MoviesCardList from './components/MoviesCardList/MoviesCardList';

import Login from './components/Login/Login';
import Register from './components/Register/Register';

import Account from './components/Account/Account';
import OverlayMenu from './components/OverlayMenu/OverlayMenu';

// import Movies from './components/Movies/Movies';

import PageNotFound from './components/PageNotFound/PageNotFound';

import defaultUser from './utils/data';
import moviesArray from './utils/movies';
import savedMoviesArray from './utils/savedMovies';

import functions from './utils/utils';

import auth from './utils/Api/Auth';
import mainApi from './utils/Api/MainApi';
import moviesApi from './utils/Api/MoviesApi';  

// import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
// import CurrentUserContext from './contexts/CurrentUserContext';
// import moviesApi from './utils/Api/MoviesApi';

function App() {

  const [ movies, setMovies ] =  useState([]);
  const [ isOverlayMenuOpen, handleOpenOverlayMenuClick ] = useState(false);

  // const [ currenUserData, setCurrentUserData ] = useState({});
  
  const [ userLoggedIn, setUserLoggedIn] = useState(false);
  const history = useHistory();

  //console.log(history);
   
  function closeAllpopups(){
    handleOpenOverlayMenuClick(false)
  }

  functions.regulateArrayLength(moviesArray, 10);
  functions.regulateArrayLength(movies, 13);

  function addMoviesToPage(){
    functions.increaseArrayLength(moviesArray);
  }

  function login(email, password){
    auth.login(email, password)
      .then((res)=>{
          // console.log(res);
          if (localStorage.getItem('jwt') === res){
            // console.log(res)
            setUserLoggedIn(true);
            console.log(`Login sucesfull! ${userLoggedIn}`);
            history.push('/');
            return res;
        }
      }).catch((err)=>{console.log(`Ошибка входа: ${err}. Тип ошибки: ${err.name}`)});
  }

  function updateUser(name, email){
    const token = localStorage.getItem('jwt');
    mainApi.setUser(name, email, token)
    .then((data)=>{
      console.log(data)
      /*setCurrentUserData({
        name: data.name,
        email: data.email
      })*/
    }).catch((err) => {console.log(err)});
  }

  function consoleIt(){
    console.log('It works!')
  }

  /*function handleLogout(){
    console.log('logout works!');
    localStorage.removeItem('jwt');
    setUserLoggedIn(false);
    history.push('/login');
    return;
  }*/

  useEffect(() => {
    function checkToken(){
      if (localStorage.getItem('jwt')){
        auth.getContent(localStorage.getItem('jwt'))
        .then((data)=>{
          console.log(data)
          /*setCurrentUserData({
            name: data.name,
            email: data.email
          })*/
          history.push('/movies');
        })
        .catch((err) => { console.log(err) });
      }
    }
    checkToken()
  }, [history]);

  useEffect(()=>{
    if(userLoggedIn) {
      Promise.all([
        moviesApi.getMovies()
      ]).then(([moviesData])=>{
        // setCurrentUser(userData.user);
        setMovies(moviesData);
      }).catch((err)=>{
        console.log(err);
      });
    }
  }, [userLoggedIn]);

  // console.log(userLoggedIn);
  // console.log(movies);

  return (
    //<CurrentUserContext.Provider value={currenUserData}>
      <div className="App">
        <BrowserRouter>
            <OverlayMenu 
              isOpen={isOverlayMenuOpen}
              isClosed={closeAllpopups}
            />

          <Route exact path="/">
            <Header 
              isLoggedIn={true}
            />
            <Promo />
            <AboutProject />
            <Techs />
            <AboutMe />
            <Footer />
          </Route>

          <Route exact path="/movies">
            <Header 
              isLoggedIn={true}
              onOpenOverlayMenu={handleOpenOverlayMenuClick}
            />
            <SearchForm />
            <MoviesCardList 
              data={moviesArray}
              addFilmsToPage={addMoviesToPage}
            />
            <Footer />
          </Route>
          
          <Route exact path="/saved-movies">
            <Header 
              isLoggedIn={true}
              onOpenOverlayMenu={handleOpenOverlayMenuClick}
            />
            <SearchForm />
            <MoviesCardList 
              data={savedMoviesArray}
              addFilmsToPage={addMoviesToPage}
            />
            <Footer />
          </Route>
  
          <Route exact path="/account">
            <Header
              isLoggedIn={true}
              onOpenOverlayMenu={handleOpenOverlayMenuClick}
            />
            <Account 
              userName={defaultUser.name}
              userEmail={defaultUser.email}
              onEditProfile={updateUser}
              logout={consoleIt}
            />
          </Route>

          <Route exact path="/login">
              <Login 
                onLoginUser={login}
              />
          </Route>

          <Route exact path="/register">
              <Register
                onRegisterUser={functions.register}
              />
          </Route>

          <Route exact path="/not-found">
              <PageNotFound 
                notFoundLinkRoute='./movies'
              />
          </Route>

        </BrowserRouter>
      </div>
    //</CurrentUserContext.Provider>
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