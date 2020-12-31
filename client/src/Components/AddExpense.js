// Imports
import React, {useState} from "react"
import ExpenseService from "../Services/ExpenseService";
import Message from "./Message"


// Material UI

// General Form Elements
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

// Calendar Input
import DatePicker from "react-datepicker";
import { parseISO } from 'date-fns' 
import "react-datepicker/dist/react-datepicker.css";

// Dropdown Menu Input
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

// CSS
import "./Form.css"


const AddExpense = props=>{
  var today = new Date()
  const [spending,setSpending] = useState({name: "", cost : "", category : "", 
                                            date : parseISO(today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate())});
  const [message, setMessage] = useState(null);

  const onChange = e =>{
      setSpending({...spending,[e.target.name] : e.target.value});
  }

  const onSubmit = e =>{
      e.preventDefault();
      setSpending(() => {
        return {
          name: "",
          cost: "",
          category: "",
          date : parseISO(today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate())
        }
      })
      ExpenseService.createSpending(spending).then(data=>{
            const {message} = data
              setMessage(message);
      });
    }
  const handleChange = e => {
    const re = /^[0-9.\b]+$/;
      if (e.target.value === '' || re.test(e.target.value)) {
        setSpending({...spending,[e.target.name] : e.target.value})
      }
  }

      return (
                <div>
                  <h1 className="wrapper center" font-size="16px" font-weight="bold">Add a New Expense</h1>
                  
                  <form onSubmit={onSubmit}>
        
                    <div className= "form-group">
                        <label for= "name">Name of Purchase:</label>
                        <TextField required 
                          name= "name"
                          className="form-control"
                          value={spending.name}
                          onChange={onChange} 
                          label="Required"/>
                    </div>

                    <div className="form-group">
                        <body className="wrapper">Date of Purchase:  </body>
                        <DatePicker name= "datepicker" selected={spending.date} onChange={date => setSpending((prevState) => {
                            return {
                                name: prevState.name,
                                cost: prevState.cost,
                                category: prevState.category,
                                date: date
                            }
                        })} />
                    </div>

                    <div className="form-group"> 
                        <body className="wrapper">Purchase Category: </body>
                        <FormControl style={{minWidth: 200}}>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="category"
                                value={spending.category}
                                onChange={onChange}
                                >
                                <MenuItem value="food">Food</MenuItem>
                                <MenuItem value="indulgent">Indulgent</MenuItem>
                                <MenuItem value="lifestyle">Lifestyle</MenuItem>
                                <MenuItem value="other">Other</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    
                    <div className= "form-group">
                        <label for= "cost">Amount ($):</label>
                        <TextField required 
                          name= "cost"
                          className="form-control"
                          value={spending.cost}
                          onChange={handleChange}
                          label="Required"/>
                    </div>
        
                    <div className= "wrapper center"> 
                        <Button className="Submit" variant="contained" color="primary" type="submit" value="Submit">Create Expense</Button>
                    </div>
        
                    {message ? <Message message={message}/> : null}
        
                  </form>
                </div>
              );
            
}

export default AddExpense;