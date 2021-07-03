import { useState } from 'react';

import '../MoviesCardList/MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import ContentBlockMain from '../ContentBlockMain/ContentBlockMain';
import ButtonLong from '../ButtonLong/ButtonLong';

import mainApi from '../../utils/Api/MainApi';

function MoviesCardList(props){

const token = localStorage.getItem('jwt');

return (
    <ContentBlockMain>
        <div className="movies-cards-list">
                {props.data.map((movie) => {
                    return (
                        <MoviesCard
                            moviesCardImage={
                            props.isOnSaveMoviesPage ? 
                                movie.image :   
                                `https://api.nomoreparties.co${movie.image.url}`}
                            movieName={movie.nameRU}
                            movieDuration={movie.duration}
                            isSaved={props.isSaved}
                            key={movie.id}
                            saveMovie={()=>{
                                    mainApi.saveMovie(movie, token)
                                    .then((movie)=>{
                                        console.log(movie);
                                        return movie
                                    })
                                    .catch((err)=>{
                                        console.log(err);
                                    })    
                                }   
                            }
                        />
                    )
                })}
            </div>
            <ButtonLong 
                buttonText="Еще"
                onClick={props.addFilmsToPage}
            />
    </ContentBlockMain>
    )
};
   
export default MoviesCardList;
