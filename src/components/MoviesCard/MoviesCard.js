import './MoviesCard.css';

import { useState } from 'react';

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
            <img src={props.moviesCardImage} className="movies-card__image" alt="Постер фильма" />
            <div className="movies-card__title-block">
                  <p className="movies-card__title">{props.movieName}</p>
                  <button 
                        onClick={handleSaveMovie}
                        className={`movies-card__like-button 
                        ${movieStatusIsSaved ? 'movies-card__like-button_active' : 'movies-card__like-button_inactive'}
                  `}></button>
            </div>      
            <div className="movies-card__duration-block">
                  <p className="movies-card__duration">{props.movieDuration}</p>
            </div>      
      </div>
  )
};

export default MoviesCard;
