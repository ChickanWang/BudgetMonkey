export default {
    stats: () => {
        return fetch('/stats/stats', {
            method: "POST",
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