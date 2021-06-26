import '../MoviesCardList/MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import ContentBlockMain from '../ContentBlockMain/ContentBlockMain';
import ButtonLong from '../ButtonLong/ButtonLong';

function MoviesCardList(props){

return (
    <ContentBlockMain>
        <div className="movies-cards-list">
                {props.data.map((movie) => {
                    return (
                        <MoviesCard
                            moviesCardImage={movie.image}
                            movieName={movie.name}
                            movieDuration={movie.duration}
                            isSaved={props.isSaved}
                            key={movie._id}
                            handleSaveMovie={props.onSaveMovie}
                        />
                    )
                })}
            </div>
            <ButtonLong 
                buttonText="Еще"
                onClick={props.addFilmsToPage}
            />
    </ContentBlockMain>
    )
};
   
export default MoviesCardList;
