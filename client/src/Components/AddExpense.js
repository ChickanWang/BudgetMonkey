// Imports
import React, {useState, useContext} from "react"
import {AuthContext} from "../Context/AuthContext";
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

// Amount Input
import FilledInput from '@material-ui/core/FilledInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';


// CSS
import "./Form.css"

// Styles Amount Input
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: '25ch',
    },
}));


const AddExpense = props=>{
  var today = new Date()
  const [spending,setSpending] = useState({name: "", cost : "", category : "", 
                                            date : parseISO(today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate())});
  const [message, setMessage] = useState(null);
  const classes = useStyles();
  const authContext = useContext(AuthContext);

  const onChange = e =>{
      setSpending({...spending,[e.target.name] : e.target.value});
  }

  const onSubmit = e =>{
      e.preventDefault();
      console.log(spending);
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
                    
                    <div className= "label-group">
                        <FormControl fullWidth className={classes.margin} variant="filled">
                            <InputLabel htmlFor="filled-adornment-amount">Amount</InputLabel>
                            <FilledInput
                                id="filled-adornment-amount"
                                name = "cost"
                                value={spending.cost}
                                onChange={handleChange}
                                required={true}
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            />
                        </FormControl>
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