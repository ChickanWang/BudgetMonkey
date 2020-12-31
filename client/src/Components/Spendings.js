import React, {useState, useEffect, useContext} from 'react'
import ExpenseService from '../Services/ExpenseService'
import ExpenseItem from './ExpenseItem'
import AuthService from '../Services/AuthService'
import {AuthContext} from '../Context/AuthContext'
import "./Form.css"
import './spendings.css'

const Spendings = props =>{
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
    });
    
    const ParentCallback = () => {
        ExpenseService.getSpendings().then(data =>{
            setSpending(data);
        });
    }
       
    if (hour < 12) {
        timeOfDay = "morning"
    } else if (hour >= 12 && hour < 17) {
        timeOfDay = "afternoon"
    } else {
        timeOfDay = "evening"
    }

    return(
        <div>
            {isAuthenticated ? 
                <div>
                    <h1 className="center wrapper"> Good {timeOfDay} {name}!</h1>
                    <h2 className="center"> Here are your spendings:</h2>
                        {   !loading ?
                                spending.length ? 
                                    <ExpenseItem key={spending[0]._id} id={spending[0]._id} callback={ParentCallback} name={spending[0].name} 
                                                    cost={spending[0].cost} date= {spending[0].date} category= {spending[0].category}/>
                                    // spending.map(element=>{
                                    //     return <ExpenseItem key={element._id} id={element._id} callback={ParentCallback} name={element.name} 
                                    //                 cost={element.cost} date= {element.date} category= {element.category}/>
                                    // }) 
                                : <h3 className= "center">You have no stored spendings</h3>
                            : <h3 className= "center">Loading...</h3>
                        }
                </div>  
            : <h1>Unauthorized</h1>}
        </div>)
}

export default Spendings