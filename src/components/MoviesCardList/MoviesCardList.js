import '../MoviesCardList/MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import ContentBlockMain from '../ContentBlockMain/ContentBlockMain';
import ButtonLong from '../ButtonLong/ButtonLong';

function MoviesCardList(props){

return (
    <ContentBlockMain>
        <div className="movies-cards-list">
                    {
                        props.data.map((currentMovie) => {
                        return (
                        <MoviesCard
                            moviesCardImage={
                                props.isOnSaveMoviesPage ? 
                                currentMovie.image :   
                                `https://api.nomoreparties.co${currentMovie.image.url}`
                            }
                                movieName={currentMovie.nameRU}
                                movieDuration={currentMovie.duration}
                                isSaved={props.isSaved}
                                key={currentMovie.id}
                                saveMovie={()=>{ props.saveMovie(currentMovie) } 
                            }
                        />
                    )
                })}
            </div>
            <ButtonLong 
                buttonText="Еще"
                onClick={()=> {props.addFilms()}}
            />
    </ContentBlockMain>
    )
};
   
export default MoviesCardList;
