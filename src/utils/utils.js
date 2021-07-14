import auth from './Api/Auth';

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

function setFoundDataToLocalStorage(name, array){
    localStorage.setItem(name, JSON.stringify(array));
}

function getFoundDataFromLocalStorage(name){
    const localStorageData = localStorage.getItem(name);
    return JSON.parse(localStorageData);
}

const functions = {
    closePopup,
    increaseArrayLength,
    
    validateEmailInput,
    validatePasswordInput,
    validateNameInput,
    filterMoviesByOwner,

    getTimeFromMins,
    setFoundDataToLocalStorage,
    getFoundDataFromLocalStorage
}

export default functions;
