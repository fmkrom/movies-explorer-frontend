import './MoviesCardListBeatfilm.css';

import { useState } from 'react';

import api from "../../utils/api";

import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardListBeatFilm(){

const [beatFilmMoviesList, setBeatFilmMovies] = useState([]);

async function getBeatFilmMovies(){
    try {
        const moviesList = await api.getBeatfilmMovies();
        setBeatFilmMovies(moviesList);
    } catch (err) {
        console.log(err);
    }
}

getBeatFilmMovies();
console.log(beatFilmMoviesList)

return (
    <div className="movies-card-list">
        {
            beatFilmMoviesList.map((movie)=>{
                // console.log(movie);
                //console.log(movie.image.id);
                return(
                    <MoviesCard 
                    moviesCardImage={`https://api.nomoreparties.co/${movie.image}`}
                    movieName={movie.nameRU}
                    movieDuration={movie.duration}
                />            
                )    
            })
        }
    </div>
    )
};
   
export default MoviesCardListBeatFilm;