import React from 'react';
import Login from './Components/Login';
import Home from './Components/Homepage';
import Register from './Components/Register';
import Spendings from './Components/Spendings';
import AddExpense from './Components/AddExpense';
import Stats from './Components/Stats'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import NavBar from './Components/Navbar';

function App() {

  return (
    <Router>
      <div className="App">
        <NavBar />
        <Route exact path = "/user/login" component = {Login} />
        <Route exact path = "/user/register" component = {Register} />
        <Route exact path = "/user/spendings" component = {Spendings} />
        <Route exact path = "/user/expense" component = {AddExpense} />
        <Route exact path = "/user/stats" component = {Stats} />
        <Route exact path = "/" component = {Home} />
      </div>
    </Router>
  );
}

export default App;
