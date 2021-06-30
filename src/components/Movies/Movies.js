import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function Movies(props){
    return(
    <>
        <Header 
            isLoggedIn={props.loggedIn}
            onOpenOverlayMenu={props.openOverlayMenu}
        />
        <SearchForm />
        <MoviesCardList 
            data={props.data}
            addFilmsToPage={props.addFilms}
        />
        <Footer />
    </>   
    )
}

export default Movies;

