import {useContext} from 'react'
// import { AuthContext } from '../Context/AuthContext'; 
// const {user, setUser, isAuthenticated, setIsAuthenticated} = useContext(AuthContext);

export default {
    register: user => {
        return fetch('http://localhost:5000/user/signup', {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                'Content-Type' : 'application/json'
            }
        }).then(res => res.json()).then(data => data);
    },

    logout: () => { 
        return fetch('http://localhost:5000/user/logout', {
            method: "GET",
            credentials: "include"
        });
    },

    isAuthenticated : ()=>{
         return fetch('http://localhost:5000/user/authenticated', {
             method: "GET",
             credentials: "include"
         })
                 .then(res=>{
                     if(res.status !== 401)
                         return res.json().then((data) => {
                             return data;
                         });
        
                     else
                         return { isAuthenticated : false, user : {username : "",role : ""}};
                });
     },
    
     user : () => {
         return fetch('http://localhost:5000/user', {
             method: "GET",
             credentials: "include"
         }).then((res) => { 
             console.log(res);
             return res.json()
            }).then(data => data)
     }
    
}