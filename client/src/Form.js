import React from "react"
import AuthService from "./Services/AuthService";

class Form extends React.Component {
    constructor(props) {
      super(props);
      this.state = {username: '',
                    password: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({[event.target.name]: event.target.value});
    }
  
    handleSubmit(event) {
      event.preventDefault();
      console.log(this.state)
      AuthService.login(this.state)
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          
          <h1>Login</h1>

            <input type="text" 
                name="username"
                placeholder="username"
                value={this.state.username} 
                onChange={this.handleChange} />
            
            <br></br>
            
            <input type="text" 
                name="password"
                placeholder="password"
                value={this.state.password} 
                onChange={this.handleChange} />
            
            <br></br>
          
          <input type="submit" value="Submit" />
        </form>
      );
    }
}

export default Form