import Header from "../Header/Header";
import OverlayMenu from "../OverlayMenu/OverlayMenu";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function MoviesPage(props){
    
    function saveMovie(){
        props.saveMovie();
    }
    
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
        <SearchForm />
        <MoviesCardList 
            data={props.data}
            addFilmsToPage={props.addFilms}
            saveMovie={saveMovie}
            savedMoviedata={props.data}
            isOnSaveMoviesPage={false}
        />
        <Footer />
    </>   
    )
}

export default MoviesPage;

