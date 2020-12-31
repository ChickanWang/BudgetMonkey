import React, { useContext, useEffect, useState }from "react"
import StatsService from "../Services/StatsService"
import {AuthContext} from '../Context/AuthContext'
import StatItem from './StatItem'


function Stats() {
    const [stats, setStats] = useState([])
    const {isAuthenticated} = useContext(AuthContext);
    

    useEffect(() => {
        StatsService.stats().then((data) => {
            setStats(data)
            console.log(data);
        })
    }, [])

    return (<div>
            {isAuthenticated ? 
            <div>
                    {
                        stats.length ? stats.map(element=>{
                            return <StatItem key={element[0]*100 + element[1]} year={element[0]} 
                                        month={element[1]} food= {element[2]} lifestyle= {element[3]} indulgent= {element[4]} 
                                        other= {element[5]} total={element[6]}/>
                        }) : <h3 className= "center">You have no stats</h3>
                    }
            </div>  : <h1>Unauthorized</h1>}
        </div>)
}

export default Stats;