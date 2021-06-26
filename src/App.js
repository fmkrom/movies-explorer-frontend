import { Route, } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { useState } from 'react';

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

import currentUser from './utils/data';
import moviesArray from './utils/movies';
import savedMoviesArray from './utils/savedMovies';

import functions from './utils/utils';

// import moviesApi from './utils/Api/MoviesApi';

function App() {

  const [ isOverlayMenuOpen, handleOpenOverlayMenuClick ] = useState(false);
  // const [ beatFilmMovies, setBeatFilmMovies ] = useState([]);
  
  /*moviesApi.getBeatfilmMovies()
  .then((movies)=> {
    setBeatFilmMovies(movies);
  })*/
  //console.log(beatFilmMovies);
   
  function closeAllpopups(){
    handleOpenOverlayMenuClick(false)
  }

  functions.regulateArrayLength(moviesArray, 10);
  // functions.regulateArrayLength(beatFilmMovies, 13);

  function addMoviesToPage(){
    functions.increaseArrayLength(moviesArray);
  }

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
            userName={currentUser.name}
            userEmail={currentUser.email}
            onEditProfile={functions.editProfile}
            handleLogout={functions.logout}
          />
        </Route>

        <Route exact path="/login">
            <Login 
              onLoginUser={functions.login}
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
