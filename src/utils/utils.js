function login(email, password){
    console.log('User email: ', email);
    console.log('User password: ', password);
}

function register(name, email, password){
    console.log('User name: ', name);
    console.log('User email: ', email);
    console.log('User password: ', password);
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
