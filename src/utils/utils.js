// import auth from './Api/Auth';

import widthsData from "./widths";

function closePopup(popupHookName){
    popupHookName(false)
}

function increaseArrayLength(array){
    let currentLength =  array.length + 3;
    console.log(currentLength);
    return currentLength;
}

function validateEmailInput(input){
    const emailInputIsEmpty = Boolean(input.isEmpty && input.isDirty);
    const emailIncorrect = Boolean(input.emailError && input.isDirty);
    const emailTooShort = Boolean(input.isDirty && input.minLength);
    const emailIsInValid = Boolean(emailTooShort || emailInputIsEmpty || emailIncorrect);
    return emailIsInValid;
}

function validatePasswordInput(input){
    const passwordInputIsEmpty = Boolean(input.isEmpty && input.isDirty);
    const passwordTooShort = Boolean(input.isDirty && input.minLength);
    
    const passwordIsInvalid = Boolean(passwordInputIsEmpty || passwordTooShort);
    return passwordIsInvalid;
}

function validateSearchInput(input){
    const searchInputIsEmpty = Boolean(input.isEmpty && input.isDirty);
    const searchInputTooShort = Boolean(input.isDirty && input.minLength);
    const searchInputIsInvalid = Boolean(searchInputIsEmpty || searchInputTooShort);
    return searchInputIsInvalid;
}

function validateNameInput(input){
    const nameInputIsInvalid = (input.nameError && input.isDirty);
    const nameInputIsEmpty = Boolean(input.isEmpty && input.isDirty);
    const nameTooShort = Boolean(input.isDirty && input.minLength);
    
    const nameIsInvalid = Boolean(nameInputIsEmpty || nameTooShort || nameInputIsInvalid);
    return nameIsInvalid;
}

function filterMoviesByOwner(user, movies){
    const moviesFilteredByOwner = movies.filter((movie)=> movie.owner === user.id);
    return moviesFilteredByOwner;
}

function getTimeFromMins(mins) {
    let hours = Math.trunc(mins/60);
    let minutes = mins % 60;
    return hours + 'ч ' + minutes + 'м';
};

function searchMovies(moviesArray, input){
    const foundMovies = moviesArray.filter((movie)=> movie.nameRU.toLowerCase().includes(input.toLowerCase()));
    return foundMovies;
}

function getLocalStorageMovies(name){
    const localStorageMovies = JSON.parse(localStorage.getItem(name));
    if (localStorageMovies === null) {
        return []
    } else {
        return localStorageMovies;
    }   
}

function getLocalStorageShortMovies(name){
    const localStorageMovies = getLocalStorageMovies(name);
    const localStorageShportMovies = localStorageMovies.filter((movie)=> movie.duration < widthsData.shortFilmDuration);
    // console.log('localStorageShportMovies in utils: ', localStorageShportMovies)
    return localStorageShportMovies;
}

function setLocalStorageMovies(name, array){
    localStorage.setItem(name, JSON.stringify(array));
}

const functions = {
    closePopup,
    increaseArrayLength,
    
    validateEmailInput,
    validatePasswordInput,
    validateNameInput,
    validateSearchInput,
    filterMoviesByOwner,

    getTimeFromMins,
    searchMovies,
    getLocalStorageMovies,
    getLocalStorageShortMovies,
    setLocalStorageMovies
}

export default functions;
