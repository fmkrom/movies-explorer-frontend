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
// import BeatFilmMoviesCardList from './components/MoviesCardListBeatfilm/BeatFilmMoviesCardList';

import Login from './components/Login/Login';
import Register from './components/Register/Register';

import Account from './components/Account/Account';
import OverlayMenu from './components/OverlayMenu/OverlayMenu';

import PageNotFound from './components/PageNotFound/PageNotFound';

import moviesArray from './utils/movies';
import savedMoviesArray from './utils/savedMovies';

import functions from './utils/utils';

import auth from './utils/Api/Auth';
import mainApi from './utils/Api/MainApi';

// import moviesApi from './utils/Api/MoviesApi';

function App() {

  const [ isOverlayMenuOpen, handleOpenOverlayMenuClick ] = useState(false);
  const [ currenUserData, setCurrentUserData ] = useState({});

  const history = useHistory();

  //console.log(history);
   
  function closeAllpopups(){
    handleOpenOverlayMenuClick(false)
  }

  functions.regulateArrayLength(moviesArray, 10);
  // functions.regulateArrayLength(beatFilmMovies, 13);

  function addMoviesToPage(){
    functions.increaseArrayLength(moviesArray);
  }

  function login(email, password){
    auth.login(email, password)
      .then((res)=>{
        console.log(res);
          if (localStorage.getItem('jwt') === res){
          // setLoggedIn(true);
          // setCurrentUserEmail(email);
            history.push('/movies');
            return res;
        }
      }).catch((err)=>{console.log(`Ошибка входа: ${err}. Тип ошибки: ${err.name}`)});
  }

  function updateUser(name, email){
    const token = localStorage.getItem('jwt');
    mainApi.setUser(name, email, token)
    .then((data)=>{
      setCurrentUserData({
        name: data.name,
        email: data.email
      })
    }).catch((err) => {console.log(err)});
  }

  function consoleIt(){
    console.log('It works!')
  }

  function handleLogout(){
    console.log('logout works!');

    localStorage.removeItem('jwt');
    // setLoggedIn(false);
    history.push('/login');
    return;
  }

  useEffect(() => {
    function checkToken(){
      if (localStorage.getItem('jwt')){
        auth.getContent(localStorage.getItem('jwt'))
        .then((data)=>{
          
          setCurrentUserData({
            name: data.name,
            email: data.email
          })
          //console.log(data);  
          history.push('/movies');
        })
        .catch((err) => { console.log(err) });
      }
    }
    checkToken()
  }, [history]);


  return (
    <div className="App">
      <BrowserRouter>
          <OverlayMenu 
            isOpen={isOverlayMenuOpen}
            isClosed={closeAllpopups}
          />

        <Route exact path="/">
          <Header 
            isLoggedIn={false}
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

        {/*
        
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

        */}
        
        <Route exact path="/account">
          <Header
            isLoggedIn={true}
            onOpenOverlayMenu={handleOpenOverlayMenuClick}
          />
          <Account 
            userName={currenUserData.name}
            userEmail={currenUserData.email}
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
  );
}

export default App;

/*
Добрый день!
До проповеди: 344:1-2
После проповеди: 344:3-4

*/
