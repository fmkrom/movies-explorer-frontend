import './MoviesCard.css';

import { useState } from 'react';
import MoviesCardImage from '../MoviesCardImage/MoviesCardImage';
import MoviesCardTitleBlock from '../MoviesCardTitleBlock/MoviesCardTitleBlock';

function MoviesCard(props){
      
      const [ movieStatusIsSaved, setMoviesStatusIsSaved ] = useState(false);

      function handleSaveMovie(){
            if (movieStatusIsSaved === false){
                  setMoviesStatusIsSaved(true);
            } else if (movieStatusIsSaved === true){
                  setMoviesStatusIsSaved(false);
            }
      }
    
return (
      <div className="movies-card">
            <MoviesCardImage 
                  image={props.moviesCardImage}
            />
            <MoviesCardTitleBlock
                  name={props.movieName}
                  handleSaveMovie={handleSaveMovie}
                  isMovieSaved={movieStatusIsSaved}
                  duration={props.movieDuration}
            />
      </div>
  )
};

export default MoviesCard;
