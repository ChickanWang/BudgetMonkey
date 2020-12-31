import React, {useState, useContext} from "react"
import {AuthContext} from "../Context/AuthContext";
import Message from "./Message"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import "./Form.css"

const Login = props=>{
  const [user,setUser] = useState({username: "", password : ""});
  const [message,setMessage] = useState(null);
  const authContext = useContext(AuthContext);

  const onChange = e =>{
      setUser({...user,[e.target.name] : e.target.value});
  }

  const login = user =>{
    return fetch('http://localhost:5000/user/login',{
        method : "post",
        body : JSON.stringify(user),
        headers : {
            'Content-Type' : 'application/json'
        },
        credentials: 'include'
    }).then(res => {
        if(res.status === 200) {
            return res.json().then(data => data);
        }
        else
          return { isAuthenticated : false, message: {msgBody: "Incorrect Username or Password", msgError: true}};
    })
}

  const onSubmit = e =>{
      e.preventDefault();
      login(user).then(data=>{
            const {isAuthenticated, message} = data
            authContext.setIsAuthenticated(isAuthenticated);
          if(isAuthenticated){
              props.history.push('/user/spendings');
          }
          else{
              setMessage(message);
          }
      });
    }


      return (<div>
                  <h1 className="form-group wrapper center" font-size="16px" font-weight="bold"> Log in</h1>
                  
                  <div className= "wrapper center">
                    <small className="form-group">Don't have an account? <a href="/user/register">Sign up!</a></small>
                  </div>
        
                  <form onSubmit={onSubmit}>
        
                    <div className= "form-group">
                        <label for= "username">Username:</label>
                        <TextField required 
                          name= "username"
                          className="form-control"
                          onChange={onChange} 
                          label="Required"/>
                    </div>
                    
                    <div className= "form-group">
                    <label for= "password">Password:</label>
                      <TextField
                        name= "password"
                        className="form-control"
                        placeholder="Password"
                        onChange={onChange}
                        label="Password"
                        type="password"
                        autoComplete="current-password"/>
                    </div>
        
                    <div className= "wrapper center"> 
                        <Button className="Submit" variant="contained" color="primary" type="submit" value="Submit">Login</Button>
                    </div>
        
                    {message ? <Message message={message}/> : null}
        
                  </form>
                </div>
              );
            
}




// class Login extends React.Component {
//     static contextType = AuthContext

//     constructor(props) {
//       super(props);
//       this.state = {username: '',
//                     password: '',
//                     loggedin: false,
//                     message: null}
                    
  
//       this.handleChange = this.handleChange.bind(this);
//       this.handleSubmit = this.handleSubmit.bind(this);
//       this.login = this.login.bind(this);
//       this.ChangeLogin = this.ChangeLogin.bind(this);
//     }

//     ChangeLogin(value) {
//       localStorage.setItem('isAuthenticated', value)
//     }

//     login(user){
//       return fetch('http://localhost:5000/user/login',{
//           method : "post",
//           body : JSON.stringify(user),
//           headers : {
//               'Content-Type' : 'application/json'
//           },
//           credentials: 'include'
//       }).then(res => {
//           if(res.status === 200) {
//               this.context.setIsAuthenticated(true);
//               this.ChangeLogin(true);
//               this.setState({loggedin: true})
//               return res.json().then(data => data);
//           }
//           else
//           this.setState({message: res.err})
//       })
//   }
  
//     handleChange(event) {
//       event.preventDefault();
//       this.setState({[event.target.name]: event.target.value});
//     }
  
//     handleSubmit(event) {
//       event.preventDefault();
//       this.login(this.user).then(data=>{

//         if(this.context.isAuthenticated){
//             this.props.history.push('/user/spendings');
//         }
//         else
//             this.setState({message: "bad"});
//         })
//     }
  
//     render() {
//       return (
//         <div>
//           <h1 className="form-group wrapper center" font-size="16px" font-weight="bold"> Log in</h1>
          
//           <div className= "wrapper center">
//             <small className="form-group">Don't have an account? <a href="/user/register">Sign up!</a></small>
//           </div>

//           <form onSubmit={this.handleSubmit}>

//             <div className= "form-group">
//                 <label for= "username">Username:</label>
//                 <TextField required 
//                   name= "username"
//                   className="form-control"
//                   value={this.state.username} 
//                   onChange={this.handleChange} 
//                   label="Required" defaultValue="Enter username"/>
//             </div>
            
//             <div className= "form-group">
//             <label for= "password">Password:</label>
//               <TextField
//                 name= "password"
//                 className="form-control"
//                 placeholder="Password"
//                 value={this.state.password} 
//                 onChange={this.handleChange}
//                 label="Password"
//                 type="password"
//                 autoComplete="current-password"/>
//             </div>

//             <div className= "wrapper center"> 
//                 <Button className="Submit" variant="contained" color="primary" type="submit" value="Submit">Login</Button>
//             </div>

//             {this.state.message ? <Message message={this.state.message}/> : null}

//           </form>
//         </div>
//       );
//     }
// }

export default Login