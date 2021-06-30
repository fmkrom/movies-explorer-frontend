import  URL from '../constants';

function checkRes(res) {
    if (res.ok) {
        return res.json();
    } else {
      Promise.reject(`Ошибка: ${res.statusText}`);
    }
}

function setUser(name, email, token){
    return fetch(`${URL.MY_BASE}/users/me`,
      {
        method: 'PATCH',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
          name: name,
          email: email
        })
    }).then(checkRes);
};

const mainApi = {
    setUser
}

export default mainApi;

/*
function checkRes(res) {
    if (res.ok) {
        //console.log(`Res in checkRes: ${res}`);
        //console.log(res);
        return res.json();
    } else {
      //console.log(`Ошибка: ${res}`);  
      //console.log(res);  
      Promise.reject(`Ошибка: ${res.statusText}`);
    }
}
*/