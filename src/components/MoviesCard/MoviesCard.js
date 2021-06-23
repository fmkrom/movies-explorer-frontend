import './MoviesCard.css';

function MoviesCard(props){
    
 return (
      <div className="movies-card">
            <img src={props.moviesCardImage} className="movies-card__image" alt="Постер фильма" />
            <div className="movies-card__title-block">
                  <p className="movies-card__title">{props.movieName}</p>
                  <button className="movies-card__like-button"></button>
            </div>      
            <div className="movies-card__duration-block">
                  <p className="movies-card__duration">{props.movieDuration}</p>
            </div>      
      </div>
  )
};

export default MoviesCard;
