import Header from "../Header/Header";
import OverlayMenu from "../OverlayMenu/OverlayMenu";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SavedMoviesCardList from "../SavedMoviesCardList/SavedMoviesCardList";
import Preloader from "../Preloader/Preloader";
import Footer from "../Footer/Footer";

function SavedMoviesPage(props){
    return(
    <>
        <OverlayMenu 
            isOpen={props.isOverlayMenuOpen}
            isClosed={props.isOverlayMenuClosed}
        />
        <Header 
            isLoggedIn={props.loggedIn}
            onOpenOverlayMenu={props.openOverlayMenu}
        />
        <SearchForm 
            onSubmitSearchForm={(input)=> {props.submitSearchForm(input)}}
        />
        <Preloader
            isShown={props.preloaderIsShown}
        />
        <SavedMoviesCardList 
            data={props.data}
            addFilmsToPage={props.addFilms}
            saveMovie={(movie)=>{props.saveMovie(movie)}}
            isOnSaveMoviesPage={true}
            isSaved={props.isSaved}
        />
        <Footer />
    </>   
    )
}

export default SavedMoviesPage;

/*
<MoviesCardList 
            data={props.data}
            addFilmsToPage={props.addFilms}
            saveMovie={(movie)=>{props.saveMovie(movie)}}
            isOnSaveMoviesPage={true}
            isSaved={props.isSaved}
        />
*/