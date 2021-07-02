import '../MoviesCardList/MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import ContentBlockMain from '../ContentBlockMain/ContentBlockMain';
import ButtonLong from '../ButtonLong/ButtonLong';
import URL from '../../utils/constants';

function MoviesCardList(props){

return (
    <ContentBlockMain>
        <div className="movies-cards-list">
                {props.data.map((movie) => {
                    return (
                        <MoviesCard
                            moviesCardImage={`https://api.nomoreparties.co${movie.image.url}`}
                            movieName={movie.nameRU}
                            movieDuration={movie.duration}
                            isSaved={props.isSaved}
                            key={movie.id}
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
