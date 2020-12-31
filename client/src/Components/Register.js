import React from "react";
import AuthService from "../Services/AuthService";
import Message from "./Message";
import Button from '@material-ui/core/Button';
import "./Form.css"
import TextField from '@material-ui/core/TextField';

class Register extends React.Component {

    constructor(props) {
      super(props);
      this.state = {name: '',
                    username: '',
                    password: '',
                    message: null}
                    
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    emptyForm() {
        this.setState(() => {
            return {
                    name: '',
                    username: '',
                    password: ''
            }
        })
    }

    handleChange(event) {
      event.preventDefault();
      this.setState({[event.target.name]: event.target.value});
    }
  
    handleSubmit(event) {
      event.preventDefault();
      if(this.state.password.length > 4) {
      AuthService.register(this.state).then(data => {
        const {message} = data;
        this.emptyForm();
        this.setState(() => {
            return {
                message: message
            }
        });
      })}

      else {
        this.setState(() => {
          return {
              message: "Password must be greater than 4 characters"
          }
      })}
    }
  
    render() {
      return (
        <div>
          <h1 className="form-group wrapper" font-size="16px" font-weight="bold"> Register</h1>
          
          <div className= "wrapper center">
            <small className="form-group">Have an account? <a href="/user/login">Log in!</a></small>
          </div>

          <form onSubmit={this.handleSubmit}>

          <div className= "form-group">
              <label for= "name">Name:</label>
              <div className= "form-group">
                <TextField required 
                  name= "name"
                  className="form-control"
                  value={this.state.name} 
                  onChange={this.handleChange} 
                  label="Required" defaultValue="Enter name"/>
                </div>
            </div>

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
              <TextField required
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
                <Button className="Submit" variant="contained" color="primary" type="submit" value="Submit">Make Account!</Button>
            </div>

            {this.state.message ? <Message message={this.state.message}/> : null}

          </form>
        </div>
      );
    }
}

export default Register