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

    login: user => {
        return fetch('http://localhost:5000/user/login', {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                'Content-Type' : 'application/json'
            }
        }).then(res => res.json()).then(data => data);
    },

    logout: () => { 
        return fetch('/logout').then(res => res.json()).then(data=>data);
    },

    isAuthenticated: () => {
        return fetch('http://localhost:5000/user/authenticated').then(res => {
            if (res.status !== 401)
                return res.json().then(data => data);
            else
                return {isAuthenticated: false, user: {username: ""}}
        })
    } 
}