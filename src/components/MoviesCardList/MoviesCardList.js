// import { useState } from 'react';

import '../MoviesCardList/MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import ContentBlockMain from '../ContentBlockMain/ContentBlockMain';
import functions from '../../utils/utils';

function MoviesCardList(props){

console.log('Props in MoviesCardList: ', props);
console.log('Data in MoviesCardList: ', props.data);

return (
    <ContentBlockMain>
        <div className="movies-cards-list">
                {
                    props.currentData.map((currentMovie) => {
                        console.log('Current Movie: ', currentMovie);
                        
                        return (
                            <MoviesCard
                                savedMoviesIds={props.savedMoviesIds}
                                isOnSavedMoviesPage={false}
                                moviesCardImage={`https://api.nomoreparties.co${currentMovie.image.url}`}
                                trailer={currentMovie.trailerLink}
                                movieName={currentMovie.nameRU}
                                movieDuration={functions.getTimeFromMins(currentMovie.duration)}
                                key={props.isOnSaveMoviesPage? currentMovie._id : currentMovie.id }
                                saveMovie={()=>{props.saveMovie(currentMovie)}}
                                isMovieSaved={Boolean(props.savedMoviesIds.includes(currentMovie.id))}
                            />
                        )
                    })
                }
            </div>
    </ContentBlockMain>
    )
};
   
export default MoviesCardList;
