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

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import CurrentUserContext from './contexts/CurrentUserContext';

function App() {

  const isTokenPresent = Boolean(localStorage.getItem('jwt'));
  
  const [ user, setUser ] = useState({});
  const [ movies, setMovies ] = useState([]);
  const [ mySavedMovies, setMySavedMovies ] = useState([]);
  const [ isOverlayMenuOpen, handleOpenOverlayMenuClick ] = useState(false);
  const [ userLoggedIn, setUserLoggedIn] = useState(isTokenPresent);
  const [ moviesCountOnPage, setMoviesCountOnPage ] = useState(4);

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
  ВАЖНО!  Пока в этой функции баг:
  Сохраненный фильм появляется на странице не сразу!
  В перспективе - исправить это!
  */

  function saveMovie(movie){
    const token = localStorage.getItem('jwt');
    mainApi.saveMovie(movie, token)
    .then((currentSavedMovie)=>{
      console.log(currentSavedMovie);
      setMySavedMovies([currentSavedMovie, ...mySavedMovies])
      return currentSavedMovie;
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

  function toggleMoviesSavedStatus(movie){
    mainApi.getMySavedMovies(localStorage.getItem('jwt'))
    .then((savedMovies)=>{
      const savedMoviesIds = savedMovies.map((mySavedMovie) => {return mySavedMovie.movieId})
        if (!savedMoviesIds.includes(movie.id)){
          saveMovie(movie);
        } else if (savedMoviesIds.includes(movie.id)){
          const currentSavedMovie = savedMovies.find((currentMovie)=> currentMovie.movieId === movie.id);
          deleteSavedMovie(currentSavedMovie._id);
        }
      }).catch((err)=>console.log(err));
  }
  

  //Поиск
  function searchMovies (input){
    const newMoviesArray = movies.filter((movie) => 
      movie.nameRU.toLowerCase().includes(input.toLowerCase())
    )
    setMovies(newMoviesArray);
  }

  /*ВАЖНО! Поиск пока работает только по элементам на странице!
    Исправить это!
  */

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
      if (window.innerWidth < 1281 && window.innerWidth > 768){
          regulateMoviesCountOnPage(4);
          // console.log(moviesCountOnPage);
      } else if (window.innerWidth < 999 && window.innerWidth > 669){
          regulateMoviesCountOnPage(3);
      } else if (window.innerWidth < 767 && window.innerWidth > 320){
        regulateMoviesCountOnPage(2);
      }
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
        const slicedMoviesArray = moviesData.slice(0, moviesCountOnPage);
        setMovies(slicedMoviesArray);

        setMySavedMovies(savedMoviesData);
      }).catch((err)=>{
        console.log(err);
      });
    }
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
            isOverlayMenuOpen={isOverlayMenuOpen}
            isOverlayMenuClosed={closeAllpopups}
            openOverlayMenu={handleOpenOverlayMenuClick}
            data={movies}
            // setMoviesSavedStatus={false}
            saveMovie={(movie)=> {toggleMoviesSavedStatus(movie)}}
            submitSearchForm={(input) => searchMovies(input)}
            addFilmsToPage={()=> addMoviesToPage()}
          />

          <ProtectedRoute
            exact path='/saved-movies'
            component={SavedMoviesPage}
            loggedIn={userLoggedIn}
            isOverlayMenuOpen={isOverlayMenuOpen}
            isOverlayMenuClosed={closeAllpopups}
            openOverlayMenu={handleOpenOverlayMenuClick}
            data={mySavedMovies}
            // setMoviesSavedStatus={false}
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