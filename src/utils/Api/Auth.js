import  URL from '../constants';

async function register(name, email, password){
  const result = await fetch(`${URL.MY_BASE}/signup`, {
        method: 'POST',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        }, body: JSON.stringify({name, email, password})
      })
      
      if (result.ok){
        const res = await result.json();
        console.log(res);
        return result;
      } else if (!result.ok){
        console.log('Result not OK!', result.status);
        return result.status
      }
};

async function login(email, password){
      const result = await fetch(`${URL.MY_BASE}/signin`, {
        method: 'POST',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        }, body: JSON.stringify({email, password})
      })
    
      if (result.ok){
        const res = await result.json();
        const jwt = res.jwt;
        localStorage.setItem('jwt', jwt);
        return jwt;
      } else if (!result.ok){
        return result.status
      }
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
};

const auth = {
    register, 
    login,
    getContent
}

export default auth;