import './MoviesCardImage.css'

function MoviesCardImage(props){
    return(
        <img src={props.image} className="movies-card__image" alt="Постер фильма" />
    )
}

export default MoviesCardImage;

/*
<img src={props.image} className="movies-card__image" alt="Постер фильма" />
*/