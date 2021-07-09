import Header from "../Header/Header";
import OverlayMenu from "../OverlayMenu/OverlayMenu";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import ButtonLong from "../ButtonLong/ButtonLong";
import Preloader from "../Preloader/Preloader";

function MoviesPage(props){
    
    // console.log(props.isSaved);
    
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
        <Preloader
            isShown={props.preloaderIsShown}
        />
        <MoviesCardList 
            data={props.data}
            saveMovie={(movie)=>{props.saveMovie(movie)}}
            savedMoviedata={props.data}
            isOnSaveMoviesPage={false}
            addFilms={()=> {props.addFilmsToPage()}}
            isSaved={(movie)=>props.isSaved(movie)}
        />
        <ButtonLong 
                buttonText="Еще"
                onClick={()=> {props.addFilmsToPage()}}
        />
        <Footer />
    </>   
    )
}

export default MoviesPage;

