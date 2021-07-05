import { useState } from 'react';

import '../MoviesCardList/MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import ContentBlockMain from '../ContentBlockMain/ContentBlockMain';

function MoviesCardList(props){

// console.log(props.isMovieSaved);

return (
    <ContentBlockMain>
        <div className="movies-cards-list">
                {
                        props.data.map((currentMovie) => {
                        
                        console.log(currentMovie);

                        // setMoviesSavedStatus(currentMovie)
                        return (
                            <MoviesCard
                                isOnSavedMoviesPage={props.isOnSaveMoviesPage}
                                moviesCardImage={
                                    props.isOnSaveMoviesPage ? 
                                    currentMovie.image :   
                                    `https://api.nomoreparties.co${currentMovie.image.url}`
                                }
                                trailer={currentMovie.trailerLink}
                                movieName={currentMovie.nameRU}
                                movieDuration={currentMovie.duration}
                                key={props.isOnSaveMoviesPage? currentMovie._id : currentMovie.id }
                                saveMovie={()=>{props.saveMovie(currentMovie)}}
                                isMovieSaved={
                                    props.isOnSaveMoviesPage ?
                                    false :
                                    props.isSaved(currentMovie)
                                }
                            />
                        )
                    })
                }
            </div>
    </ContentBlockMain>
    )
};
   
export default MoviesCardList;
