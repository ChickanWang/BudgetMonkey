import React, {useContext} from 'react';
import Login from './Components/Login';
import Home from './Components/Homepage';
import Register from './Components/Register';
import { AuthContext } from './Context/AuthContext'; 
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import NavBar from './Components/Navbar'

function App() {
  const {user, setUser, isAuthenticated, setIsAuthenticated} = useContext(AuthContext);

  console.log(user);
  console.log(isAuthenticated);
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Route exact path = "/user/login" component = {Login} />
        <Route exact path = "/user/register" component = {Register} />
        <Route exact path = "/" component = {Home} />
      </div>
    </Router>
  );
}

export default App;
