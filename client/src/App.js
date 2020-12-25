import React, {useContext} from 'react';
import Form from './Form';
import './App.css';
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
        <Form />
      </div>
    </Router>
  );
}

export default App;
