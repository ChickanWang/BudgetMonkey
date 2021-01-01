export default {
    register: user => {
        return fetch('/user/signup', {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                'Content-Type' : 'application/json'
            }
        }).then(res => res.json()).then(data => data);
    },

    logout: () => { 
        return fetch('/user/logout', {
            method: "POST",
            credentials: "include"
        });
    },

    isAuthenticated : ()=>{
         return fetch('/user/authenticated', {
             method: "POST",
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
         return fetch('/user', {
             method: "POST",
             credentials: "include"
         }).then((res) => { 
             console.log(res);
             return res.json()
            }).then(data => data)
     }
    
}