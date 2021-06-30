import  URL from '../constants';

function checkRes(res) {
    if (res.ok) {
        console.log(`Res in checkRes: ${res}`);
        console.log(res);
        return res.json();
    } else {
      console.log(`Ошибка: ${res}`);  
      console.log(res);  
      Promise.reject(`Ошибка: ${res.statusText}`);
    }
}

export function register(name, email, password){  
  return fetch(`${URL.MY_BASE}/signup`,{
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({name, email, password})
  }).then(checkRes)
};

export function login(email, password){
  return fetch(`${URL.MY_BASE}/signin`, {
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({email, password})
  }).then(checkRes)
  .then((data)=>{
    const currentJwt = data.jwt;
    localStorage.setItem('jwt', currentJwt);
    return currentJwt;
  })
};


export function getContent(token){
  return fetch(`${URL.MY_BASE}/users/me`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
  },
  }).then((res)=>{
    return res.json();
  }).then((data)=>{
    return data;
  })
  .catch((err)=>{
    console.log(err);
  })
};

const auth = {
    register, 
    login,
    getContent
}

export default auth;
