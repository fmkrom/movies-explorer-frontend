import { Route, Switch, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';

import './App.css';

import Header from './components/Header/Header';
import Promo from './components/Promo/Promo';
import AboutProject from './components/AboutProject/AboutProject';
import Techs from './components/Techs/Techs';
import AboutMe from './components/AboutMe/AboutMe'
import Footer from './components/Footer/Footer';
import Resume from './components/Resume/Resume';
// import HowToLearn from '../src/projects/HowToLearn/HowToLearn';

import Login from './components/Login/Login';
import Register from './components/Register/Register';
import OverlayMenu from './components/OverlayMenu/OverlayMenu';

import MoviesPage from './components/MoviesPage/MoviesPage';
import SavedMoviesPage from './components/SavedMoviesPage/SavedMoviesPage';
import AccountPage from './components/AccountPage/AccountPage';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Portfolio from './components/Portfolio/Portfolio';
import Table from './components/Table/Table';

import auth from './utils/Api/Auth';
import mainApi from './utils/Api/MainApi';
import MoviesApi from './utils/Api/MoviesApi';  
import widthsData from './utils/widths';
import portfolio from './info/portfolio';
import resume from './info/resume';

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import CurrentUserContext from './contexts/CurrentUserContext';
import functions from './utils/utils';

function App() {

  const isTokenPresent = Boolean(localStorage.getItem('jwt'));
  
  const [ user, setUser ] = useState({});
  
  const [ allBeatFilmMovies, setAllBeatFilmMovies ] = useState([]);
  const [ shortBeatFilmMovies, setShortBeatfilmMovies ] = useState([]);
  const [ moviesOnPage, setMoviesOnPage ] = useState([]);
  const [ mySavedMovies, setMySavedMovies ] = useState([]);
  const [ mySavedMoviesIDs, setMySavedMoviesIDs ] = useState([]);
  const [ isPreloaderShown, setPreloaderShown ] = useState(false);

  const [ noMoviesFoundShown, setNoMoviesFoundShown ] = useState(false);
  const [ moreButtonShown, setMoreButtonShown ] = useState(true);

  const [ isOverlayMenuOpen, handleOpenOverlayMenuClick ] = useState(false);
  const [ userLoggedIn, setUserLoggedIn] = useState(isTokenPresent);

  const [errorMessageTextLogin, setErrorMessageTextLogin] = useState('');
  const [errorMessageTextRegister, setErrorMessageTextRegister] = useState('');
  const [ errorMessageUpdateUser, setErrorMessageUpdateUser ] = useState('');
  
  const [ editProfileButtonShown, setEditProfileButtonShown ] = useState(true);
  const [ saveProfileButtonShown, setSaveProfileButtonShown ] = useState(false); 

  const [ shortFilmsFilterOn, switchshortFilmsFilterOn ] = useState(false);

  function returnAmountOfCards(){
    if (window.innerWidth < 2560 && window.innerWidth > 1276){
      return widthsData.widths.widescreen
    } else if (window.innerWidth < 1276 && window.innerWidth > 999){
      return widthsData.widths.laptop
    } else if (window.innerWidth < 998 && window.innerWidth > 669){
      return widthsData.widths.tablet
    } else if (window.innerWidth < 669){
      return widthsData.widths.smartphone
    }  
  }

  const [ amountOfCardsOnPage, setAmountOfCardsOnPage ] = useState(returnAmountOfCards());

  const history = useHistory();

  function closeAllpopups(){
    handleOpenOverlayMenuClick(false)
  }

  async function register(name, email, password){
    try {
      const res = await auth.register(name, email, password);
      if (res.status === 200){
        setErrorMessageTextRegister('');
        history.push('/login');
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

  // Функция логина в App.js:
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
    const data = await mainApi.setUser(name, email, token);
    console.log(data);
    if (data.status === 200) {
      setUser({ name: data.res.name, email: data.res.email });
      setSaveProfileButtonShown(false);
      setEditProfileButtonShown(true);
      setErrorMessageUpdateUser('Данные профиля обновлены');
      return;
    } else {
      if (data.status === 400) {
        setErrorMessageUpdateUser('Введите корректные данные!');
      } else if (data.status === 409) {
        setErrorMessageUpdateUser('Пользователь с таким e-mail уже существует')
      } else if (data.status === 500){
        setErrorMessageUpdateUser('Пользователь с таким e-mail уже существует');
      } else if (!data.status){
        setErrorMessageUpdateUser('Неизвестная ошибка');
      }
    }
  } catch (err) {
    console.log(err);
  }
}

function logout(){
  localStorage.removeItem('jwt');
  localStorage.removeItem('movies');
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

  function filterMoviesByDuration(){
    setNoMoviesFoundShown(false);
    setMoreButtonShown(true);
    if (shortFilmsFilterOn === false) {
      switchshortFilmsFilterOn(true)
    } else if (shortFilmsFilterOn === true) {
      switchshortFilmsFilterOn(false)
    }
  }

  function filterAndSearchMovies(input, status, moviesArray, shortMoviesArray){
    setPreloaderShown(false);
    if (status === false){
      const foundMovies = functions.searchMovies(moviesArray, input);
      if (foundMovies.length === 0){
        setNoMoviesFoundShown(true);
        functions.setLocalStorageMovies('movies', foundMovies);
        setMoviesOnPage([]);
        setMoreButtonShown(false);
      } else {
      // console.log('movies present: ', foundMovies)
        functions.setLocalStorageMovies('movies', foundMovies);
        setMoviesOnPage(foundMovies);
        setNoMoviesFoundShown(false);
        setMoreButtonShown(true);
      }
    } else if (status === true){
      const foundShortMovies = functions.searchMovies(shortMoviesArray, input);
      if (foundShortMovies.length === 0){
        setMoviesOnPage([]);
        setNoMoviesFoundShown(true);
        functions.setLocalStorageMovies('movies', foundShortMovies);
        setMoreButtonShown(false);
      } else {
        // console.log('short movies present: ', foundShortMovies)
        functions.setLocalStorageMovies('movies', foundShortMovies);
        setMoviesOnPage(foundShortMovies);
        setNoMoviesFoundShown(false);
        setMoreButtonShown(true);
      }
    }
  };
  
  function filterAndSearchMySavedMovies(input, status, moviesArray){
    if (status === false){
       const foundMovies = moviesArray.filter((movie)=> movie.nameRU.toLowerCase().includes(input.toLowerCase()));
       if (foundMovies.length === 0){
        setNoMoviesFoundShown(true);
        setMySavedMovies(foundMovies);
      } else {
        setNoMoviesFoundShown(false);
        setMySavedMovies(foundMovies);
      }
     } else if (status === true){
       const moviesFilteredByDuration = moviesArray.filter((movie)=> movie.duration < widthsData.shortFilmDuration)
       const foundMovies = moviesFilteredByDuration.filter((movie)=> movie.nameRU.toLowerCase().includes(input.toLowerCase()));
      if (foundMovies.length === 0){
        setNoMoviesFoundShown(true);
        setMySavedMovies(foundMovies);
      } else {
        setNoMoviesFoundShown(false);
        setMySavedMovies(foundMovies);
      }
     }
  };

  // Функции количества карточек
  function regulateMoviesCountOnPage(i){
    setAmountOfCardsOnPage(amountOfCardsOnPage + i)
  }
 
  function addMoviesToPage(){
    if (window.innerWidth < 2560 && window.innerWidth > 1276){
      regulateMoviesCountOnPage(widthsData.add.widescreen);
    } else if (window.innerWidth < 1276 && window.innerWidth > 999){
      regulateMoviesCountOnPage(widthsData.add.laptop)
    } else if (window.innerWidth < 998 && window.innerWidth > 669){
      regulateMoviesCountOnPage(widthsData.add.tablet)
    } else if (window.innerWidth < 669){
      regulateMoviesCountOnPage(widthsData.add.smartphone)
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
    if(userLoggedIn) {
      Promise.all([
        MoviesApi.getAllBeatFilmMovies(),
        mainApi.getUsersSavedMovies(token, user),
      ]).then(([moviesData, usersSavedMovies ])=>{
        const localStorageMovies = functions.getLocalStorageMovies('movies');
        const localStorageShortMovies = functions.getLocalStorageShortMovies('movies');
        
        const preloader = Boolean(localStorage.getItem('movies') === null);
        preloader ? setPreloaderShown(true) : setPreloaderShown(false);
        
        setMoviesOnPage(!shortFilmsFilterOn ? localStorageMovies.slice(0, amountOfCardsOnPage) : localStorageShortMovies.slice(0, amountOfCardsOnPage)); 
        setAllBeatFilmMovies(moviesData.beatFilmMovies);
        setShortBeatfilmMovies(moviesData.beatFilmShortMovies);
        const currentIdsArray = usersSavedMovies.map((mySavedMovie)=>{return mySavedMovie.movieId});
        setMySavedMoviesIDs(currentIdsArray);
        setMySavedMovies(usersSavedMovies.reverse());
      }).catch((err)=>{
        console.log(err);
      });
    }
  }, [userLoggedIn, shortFilmsFilterOn, amountOfCardsOnPage, user ]);

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
            isMoreButtonShown={moreButtonShown}
            loggedIn={userLoggedIn}
            noMoviesFoundShown={noMoviesFoundShown}
            preloaderIsShown={isPreloaderShown}
            isOverlayMenuOpen={isOverlayMenuOpen}
            isOverlayMenuClosed={closeAllpopups}
            openOverlayMenu={handleOpenOverlayMenuClick}
            data={moviesOnPage}
            saveMovie={(movie)=>{toggleMoviesSavedStatus(movie)}}
            submitSearchForm={(input) => {filterAndSearchMovies(input, shortFilmsFilterOn, allBeatFilmMovies, shortBeatFilmMovies)}}
            filterShortFilms={()=>{filterMoviesByDuration()}}
            filterShortFilmsOn={shortFilmsFilterOn}
            addFilmsToPage={()=> {addMoviesToPage()}}
          />

          <ProtectedRoute
            exact path='/saved-movies'
            component={SavedMoviesPage}
            loggedIn={userLoggedIn}
            noMoviesFoundShown={noMoviesFoundShown}
            preloaderIsShown={false}
            isOverlayMenuOpen={isOverlayMenuOpen}
            isOverlayMenuClosed={closeAllpopups}
            openOverlayMenu={handleOpenOverlayMenuClick}
            data={!shortFilmsFilterOn ? mySavedMovies: mySavedMovies.filter((movie)=> movie.duration < widthsData.shortFilmDuration)}
            saveMovie={(movie)=> {deleteSavedMovie(movie._id)}}
            filterShortFilms={()=>{filterMoviesByDuration()}}
            filterShortFilmsOn={shortFilmsFilterOn}
            submitSearchForm={(input) => filterAndSearchMySavedMovies(input, shortFilmsFilterOn, mySavedMovies)}
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
            logout={()=>{logout()}}
            errorMessageText={errorMessageUpdateUser}
            showSaveProfileButton={()=> {showSaveProfileButton()}}
            editProfileButtonDisplayed={editProfileButtonShown}
            saveProfileButtonDisplayed={saveProfileButtonShown}
          />

          <Route exact path="/beatfilm-full-list">
            <OverlayMenu 
              isOpen={isOverlayMenuOpen}
              isClosed={closeAllpopups}
            />
            <Header
              isLoggedIn={userLoggedIn}
              onOpenOverlayMenu={handleOpenOverlayMenuClick}
            />
            <Table data={allBeatFilmMovies} />
            <Footer />
          </Route>
          
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

          <Route exact path="/resume">
            <OverlayMenu 
              isOpen={isOverlayMenuOpen}
              isClosed={closeAllpopups}
            />
            <Header
              isLoggedIn={userLoggedIn}
              onOpenOverlayMenu={handleOpenOverlayMenuClick}
            />
            <Resume 
              data={resume.ru}
            />
            <Footer />
          </Route>

          <Route exact path="/resume/ru">
            <OverlayMenu 
              isOpen={isOverlayMenuOpen}
              isClosed={closeAllpopups}
            />
            <Header
              isLoggedIn={userLoggedIn}
              onOpenOverlayMenu={handleOpenOverlayMenuClick}
            />
            <Resume 
              data={resume.ru}
            />
            <Footer />
          </Route>

          <Route exact path="/resume/en">
            <OverlayMenu 
              isOpen={isOverlayMenuOpen}
              isClosed={closeAllpopups}
            />
            <Header
              isLoggedIn={userLoggedIn}
              onOpenOverlayMenu={handleOpenOverlayMenuClick}
            />
            <Resume
              data={resume.en}
            />
            <Footer />
          </Route>

          <Route exact path="/portfolio/ru">
            <OverlayMenu 
              isOpen={isOverlayMenuOpen}
              isClosed={closeAllpopups}
            />
            <Header
              isLoggedIn={userLoggedIn}
              onOpenOverlayMenu={handleOpenOverlayMenuClick}
            />
            <Portfolio 
              portfolioTitle="Портфолио"
              portfolioSubtitle="Junior Web разработчика"
              buttonText="Резюме"
              linkRoute="../resume/ru"
              portfolioName="Ефима Романенко"
              typeTitle="Тип: "
              technologiesTitle="Технологии: "
              githubTitle="Код на Github: "
              frontendTitle="Фронтэнд"
              backendTitle="Бэкенд"
              projects={portfolio.ru}
            />
            <Footer />
          </Route>

          <Route exact path="/portfolio/en">
            <OverlayMenu 
              isOpen={isOverlayMenuOpen}
              isClosed={closeAllpopups}
            />
            <Header
              isLoggedIn={userLoggedIn}
              onOpenOverlayMenu={handleOpenOverlayMenuClick}
            />
            <Portfolio 
              portfolioTitle="Portfolio"
              portfolioSubtitle="by Efim Romanenko"
              buttonText="Resume"
              linkRoute="../resume/en"
              portfolioName="a Junior Web Developer"
              typeTitle="Type: "
              technologiesTitle="Technologies: "
              githubTitle="Code on Github: "
              frontendTitle="Frontend"
              backendTitle="Backend"
              projects={portfolio.en}
            />
            <Footer />
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