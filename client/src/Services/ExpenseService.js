export default {
    getSpendings: () => {
        return fetch('http://localhost:5000/user/getmoneys')
        .then(response => {
            if(response.status !== 401)
                return response.json().then(data => data)
            else 
                return {message: {msgBody: "unauthorized"}, msgError: true}
        })
    },
    getTodos : ()=>{
        return fetch('/user/todos')
                .then(response=>{
                    if(response.status !== 401){
                        return response.json().then(data => data);
                    }
                    else
                        return {message : {msgBody : "UnAuthorized",msgError : true}};
                });
    },
    createSpending: todo => {
        return fetch('http://localhost:5000/user/expense', {
            method: 'post',
            body: JSON.stringify(todo),
            headers: {
                'Content-type': 'application/json'
            }
        }).then(response => {
            if(response.status !== 401)
                return response.json().then(data => data)
            else 
                return {message: {msgBody: "unauthorized"}, msgError: true}
        })
    }
}

