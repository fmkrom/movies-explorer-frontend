import Header from "../Header/Header";
import OverlayMenu from "../OverlayMenu/OverlayMenu";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function MoviesPage(props){
    
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
        <MoviesCardList 
            data={props.data}
            // isSaved={props.setMoviesSavedStatus}
            saveMovie={(movie)=>{props.saveMovie(movie)}}
            savedMoviedata={props.data}
            isOnSaveMoviesPage={false}
            addFilms={()=> {props.addFilmsToPage()}}
        />
        <Footer />
    </>   
    )
}

export default MoviesPage;

