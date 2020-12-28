import React from 'react'
import {AuthContext} from '../Context/AuthContext'
import ExpenseService from '../Services/ExpenseService'
import ExpenseItem from './ExpenseItem'

class Spendings extends React.Component {
    static contextType = AuthContext

    constructor(props) {
        super(props);
        this.state = {expenses: [],
                      message: null}
    }

    componentDidMount() {
        let _getSpendingAsync = async () => {
            const spending = await ExpenseService.getSpendings()
            if(spending.message){
                console.log("error", spending.message && spending.message.msgBody)
                return
            }
            this.setState({expenses: spending})
        }
        /*fetch('http://localhost:5000/user/getmoneys')
        .then(response => response.json())
        .then(data => this.setState({ expenses: data}));
        */
        _getSpendingAsync()
        // ExpenseService.getSpendings().then(data => this.setState(() => {
        //     return {
        //         expenses: data
        //     }
        // }))
    }

    render() {
        console.log(this.state.expenses);
        var List = <div>{this.state.expenses.map(element => <ExpenseItem key={element._id} name={element.name} 
            cost={element.cost} date= {element.date} category= {element.category}/>)
            }</div>
        return(
            <List/>
        )
    }
}

export default Spendings