import React, {useState, useEffect, useContext} from 'react'
import ExpenseService from '../Services/ExpenseService'
import ExpenseItem from './ExpenseItem'
import AuthService from '../Services/AuthService'
import {AuthContext} from '../Context/AuthContext'
import "./Form.css"
import './spendings.css'

const Spendings = props => {
    const [name, setName] = useState(null);
    const [spending,setSpending] = useState([]);
    const [loading,setLoading] = useState(true)
    const {isAuthenticated} = useContext(AuthContext);
    const date = new Date();
    const hour = date.getHours()
    let timeOfDay;

    useEffect(()=>{
            ExpenseService.getSpendings().then(data =>{
                setSpending(data);
                setLoading(false);
            });
            AuthService.isAuthenticated().then(data => {
                setName(data.user.name)
            })
    }, []);
    
    const ParentCallback = () => {
        ExpenseService.getSpendings().then(data =>{
            setSpending(data);
        });
    }
       
    if (hour < 12 && hour > 5) {
        timeOfDay = "Morning"
    } else if (hour >= 12 && hour < 17) {
        timeOfDay = "Afternoon"
    } else {
        timeOfDay = "Evening"
    }

    return(
        <div>
            {isAuthenticated ? 
                <div>
                    <h3 className="container title offset-md-3" style={{paddingLeft:"80px"}}> Good {timeOfDay} {name}.</h3>
                    <h4 className="container offset-md-3" style={{paddingLeft:"80px"}}> Your Spending History:</h4>
                        {   !loading ?
                                spending.length ? 
                                    spending.map(element=>{
                                        return <ExpenseItem key={element._id} id={element._id} callback={ParentCallback} name={element.name} 
                                                    cost={element.cost} date= {element.date} category= {element.category}/>
                                    }) 
                                : <h3 className= "container title cardname offset-md-4">You have no stored spendings.</h3>
                            : <h3 className= "center">Loading...</h3>
                        }
                </div>  
            : <h1>Unauthorized</h1>}
        </div>)
}

export default Spendings