// import { useState } from 'react';

import '../SavedMoviesCardList/SavedMoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import ContentBlockMain from '../ContentBlockMain/ContentBlockMain';

function SavedMoviesCardList(props){

// console.log(props.isMovieSaved);

return (
    <ContentBlockMain>
        <div className="movies-cards-list">
                {
                        props.data.map((currentMovie) => {
                        return (
                            <MoviesCard
                                isOnSavedMoviesPage={true}
                                moviesCardImage={currentMovie.image}
                                trailer={currentMovie.trailerLink}
                                movieName={currentMovie.nameRU}
                                movieDuration={currentMovie.duration}
                                key={currentMovie._id}
                                saveMovie={()=>{props.saveMovie(currentMovie)}}
                                isMovieSaved={false}
                            />
                        )
                    })
                }
            </div>
    </ContentBlockMain>
    )
};
   
export default SavedMoviesCardList;
