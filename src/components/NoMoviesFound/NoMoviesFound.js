import './NoMoviesFound.css';

function NoMoviesFound(props){
    return(
        <span className={`no-movies-found
            ${props.noMoviesFoundShown ? 'no-movies-found_shown' : 'no-movies-found_hidden'}
        `}>Ничего не найдено...</span>
    )
}

export default NoMoviesFound;