import React from "react"
import {AuthContext} from "../Context/AuthContext";
import AuthService from "../Services/AuthService";
import Message from "./Message"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import "./Form.css"

class Form extends React.Component {
    static contextType = AuthContext

    constructor(props) {
      super(props);
      this.state = {username: '',
                    password: '',
                    message: null}
                    
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      event.preventDefault();
      this.setState({[event.target.name]: event.target.value});
      console.log(this.state);
    }
  
    handleSubmit(event) {
      event.preventDefault();
      console.log(this.state)
      AuthService.login(this.state).then(data => {
        const {isAuthenticated, user, message} = data;
        if(isAuthenticated) {
          this.context.setUser(user)
          this.context.setIsAuthenticated(isAuthenticated)
          this.props.history.push('/user/expense')
        }
        else 
          this.setState(() => {
            return {
              message: message
            }
          });
      })
    }
  
    render() {
      return (
        <div>
          <h1 className="form-group wrapper center" font-size="16px" font-weight="bold"> Log in</h1>
          
          <div className= "wrapper center">
            <small className="form-group">Don't have an account? <a href="/user/register">Sign up!</a></small>
          </div>

          <form onSubmit={this.handleSubmit}>

            <div className= "form-group">
                <label for= "username">Username:</label>
                <TextField required 
                  name= "username"
                  className="form-control"
                  value={this.state.username} 
                  onChange={this.handleChange} 
                  label="Required" defaultValue="Enter username"/>
            </div>
            
            <div className= "form-group">
            <label for= "password">Password:</label>
              <TextField
                name= "password"
                className="form-control"
                placeholder="Password"
                value={this.state.password} 
                onChange={this.handleChange}
                label="Password"
                type="password"
                autoComplete="current-password"/>
            </div>

            <div className= "wrapper center"> 
                <Button className="Submit" variant="contained" color="primary" type="submit" value="Submit">Login</Button>
            </div>

            {this.state.message ? <Message message={this.state.message}/> : null}

          </form>
        </div>
      );
    }
}

export default Form