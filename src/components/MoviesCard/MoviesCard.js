import './MoviesCard.css';

import MoviesCardImage from '../MoviesCardImage/MoviesCardImage';
import MoviesCardTitleBlock from '../MoviesCardTitleBlock/MoviesCardTitleBlock';

function MoviesCard(props){
    
return (
      <div className="movies-card">
            <MoviesCardImage 
                  image={props.moviesCardImage}
            />
            <MoviesCardTitleBlock
                  name={props.movieName}
                  handleSaveMovie={()=>props.saveMovie()}
                  isMovieSaved={props.isMovieSaved}
                  duration={props.movieDuration}
            />
      </div>
  )
};

export default MoviesCard;
