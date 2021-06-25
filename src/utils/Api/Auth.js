import  MY_BASE_URL from '../constants';

// const checkResponse = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.statusText}`);

function checkRes(res) {
    if (res.ok) {
        console.log(res);
        return res.json();
    } else {
        Promise.reject(`Ошибка: ${res.statusText}`);
    }
}

export function register(name, email, password){  
  return fetch(`${MY_BASE_URL}/signup`,{
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({name, email, password})
  }).then((res) => checkRes(res))
    .catch((err)=>{ console.log(err) });
};

export function login(email, password){
  return fetch(`${MY_BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({email, password})
  }).then((res)=> checkRes(res))
    .then((token)=>{
        localStorage.setItem('jwt', token);
        console.log(token)
        return token;
    })
    .catch((err)=>{ console.log(err) });
};

export function getContent(token){
  return fetch(`${MY_BASE_URL}/users/me`, {
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
