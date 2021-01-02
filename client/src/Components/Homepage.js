import React, {useContext, useEffect}from "react"
import Pickture from "./Homepage.png"
import "./Homepage.css"
import {AuthContext} from "../Context/AuthContext"

function Homepage(props) {
    const {isAuthenticated} = useContext(AuthContext);

   const onLog = e => {
        props.history.push('/user/login')
    }

    const onStart = e => {
        props.history.push('/user/register')
    }

    useEffect(() => {
        if (isAuthenticated)
            props.history.push('/user/spendings')
    }, [isAuthenticated, props.history]) 

    return (
        <div className="row"> 
            <div className="offset-1 col-md-5" style={{paddingTop:"200px"}}>
                    <h1 className="h1">Welcome to BudgetMonkey</h1>
                    <h2 className="h2">It's so easy a monkey could do it!</h2> 
                    <p className="p">
                        BudgetMonkey is your personal budget tracker, making 
                        <br/>
                        financial management easier than ever. 
                        </p>
                    <span><button className="butn" onClick={onStart}>Start Now</button></span>
                    <span><button className="butn" onClick={onLog}>Log in</button></span>
            </div>

            <div className="col-md-6" style={{paddingTop:"40px"}}>
                <img style={{width:"100%"}}src={Pickture} alt=""></img>
            </div>

        </div>)
}
export default Homepage