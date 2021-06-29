import auth from './Api/Auth';

function register(name, email, password){
    auth.register(name, email, password)
    .then((res) =>{
        console.log(`Register sucesfull: ${res}`);
    })
    .catch((err)=> console.log(err));
}

function login(email, password){
    auth.login(email, password)
    .then((res) =>{
        console.log(`Login sucesfull: ${res}`);
    })
    .catch((err)=> console.log(err));
}



function editProfile(name, email){
    console.log('Edited User name: ', name);
    console.log('Edited User email: ', email);
}

function logout(){
    console.log('Logout successful!')
}

function closePopup(popupHookName){
    popupHookName(false)
}

function regulateArrayLength(array, currentLength){
    return array.length = currentLength;
}

function increaseArrayLength(array){
    let currentLength =  array.length + 3;
    console.log(currentLength);
    return currentLength;
}

const functions = {
    login, 
    register,
    editProfile,
    logout,
    closePopup,
    regulateArrayLength,
    increaseArrayLength
}

export default functions;
