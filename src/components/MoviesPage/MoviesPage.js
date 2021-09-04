import Header from "../Header/Header";
import OverlayMenu from "../OverlayMenu/OverlayMenu";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import ButtonLong from "../ButtonLong/ButtonLong";
import Preloader from "../Preloader/Preloader";
import NoMoviesFound from "../NoMoviesFound/NoMoviesFound";

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
            filterShortFilms={()=>{props.filterShortFilms()}}
            filterShortFilmsOn={props.filterShortFilmsOn}
        />
        {
            props.preloaderIsShown ? 
            <Preloader
            isShown={props.preloaderIsShown}
            /> :
            <>
                <NoMoviesFound
                    noMoviesFoundShown={props.noMoviesFoundShown}
                />
                <MoviesCardList 
                    savedMoviesIds={props.savedMoviesIds}
                    currentData={props.data}
                    saveMovie={(movie)=>{props.saveMovie(movie)}}
                    savedMoviedata={props.data}
                    isOnSaveMoviesPage={false}
                    addFilms={()=> {props.addFilmsToPage()}}
                />
                <ButtonLong 
                    isShown={props.isMoreButtonShown}
                    buttonText="Еще"
                    onClick={()=> {props.addFilmsToPage()}}
                />
            </>     
        }
        <Footer />
    </>   
    )
}

export default MoviesPage;

