// import { useState } from 'react';

import '../SavedMoviesCardList/SavedMoviesCardList.css';
import SavedMoviesCard from '../SavedMoviesCard/SavedMoviesCard';
import ContentBlockMain from '../ContentBlockMain/ContentBlockMain';
import functions from '../../utils/utils';

function SavedMoviesCardList(props){
// console.log('Props in SavedMoviesCardList: ', props);
// console.log('DATA in SavedMoviesCardList: ', props.data);

return (
    <ContentBlockMain>
        <div className="movies-cards-list">
                {
                        props.data.map((currentMovie) => {
                        return (
                            <SavedMoviesCard
                                moviesCardImage={currentMovie.image}
                                trailer={currentMovie.trailer}
                                movieName={currentMovie.nameRU}
                                movieDuration={functions.getTimeFromMins(currentMovie.duration)}
                                key={currentMovie._id}
                                saveMovie={()=>{props.saveMovie(currentMovie)}}
                            />
                        )
                    })
                }
            </div>
    </ContentBlockMain>
    )
};
   
export default SavedMoviesCardList;