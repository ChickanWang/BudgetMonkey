export default {
    getSpendings: () => {
        return fetch('http://localhost:5000/expenses/getmoneys/', {
            method: "GET",
            credentials: "include"
        })
        .then(response => {
            if(response.status !== 401){ 
                console.log("req worked")
                return response.json().then(data => {
                    console.log("data", data);
                    return data;
                })
            }else{
                console.log("req didn't work")
                console.log("error", response)
                return {message: {msgBody: "unauthorized"}, msgError: true}
            }
        })
    },
    createSpending: spending => {
        return fetch('http://localhost:5000/expenses/expense/', {
            method: 'post',
            body: JSON.stringify(spending),
            headers: {
                'Content-type': 'application/json'
            },
            credentials: "include"
        }).then(response => {
            if(response.status !== 401)
                return response.json().then(data => data)
            else 
                return {message: {msgBody: "unauthorized"}, msgError: true}
        })
    },
    deleteSpending: id => {
        return fetch('http://localhost:5000/expenses/delete/', {
            method: 'post',
            body: JSON.stringify(id),
            headers: {
                'Content-type': 'application/json'
            },
            credentials: "include"
        }).then(response => {
            if(response.status !== 401) {
                return response.json().then(data => data)
            }
            else 
                return {message: {msgBody: "unauthorized"}, msgError: true}
        })
    }
}

