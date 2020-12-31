export default {
    stats: () => {
        return fetch('http://localhost:5000/stats/stats', {
            method: "GET",
            credentials: "include"
        }).then((response) => {
            if(response.status !== 401){ 
                return response.json().then(data => {
                    console.log(data);
                    return data;
            })
        }else{
            return {message: {msgBody: "unauthorized"}, msgError: true}}
        })
    }
}