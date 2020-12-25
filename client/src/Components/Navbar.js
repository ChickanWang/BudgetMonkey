import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {AuthContext} from '../Context/AuthContext'
import AuthService from '../Services/AuthService'


function Logout() {
    const {setIsAuthenticated, setUser} = useContext(AuthContext);

    AuthService.logout().then(data => {
        if (data.success) {
            setUser(data.user);
            setIsAuthenticated(false);
        }
    })
}

function AuthenticatedNav() {
    return(<> 
        <Link to= "/">
            <li className="nav-item nav-link">
                Homepage
            </li>
        </Link>

        <Link to= "/user/expense">
            <li className="nav-item nav-link">
                Add Expense
            </li>
        </Link>

        <Link to= "/user/spendings">
            <li className="nav-item nav-link">
                View Spendings
            </li>
        </Link>

        <Link to= "/user/stats">
            <li className="nav-item nav-link">
                View Stats
            </li>
        </Link>

        <button className = "btn btn-link nav-item nav-link" OnClick={Logout}>Logout</button>
    </>)
}

function UnauthenticatedNav() {
    return(<>
        <Link to= "/">
            <li className="nav-item nav-link">
                Homepage
            </li>
        </Link>

        <Link to= "/user/login">
            <li className="nav-item nav-link">
                Login
            </li>
        </Link>

        <Link to= "/user/register">
            <li className="nav-item nav-link">
                New Account
            </li>
        </Link>
    </>)

}

function NavBar() {
    const {isAuthenticated, user, setIsAuthenticated, setUser} = useContext(AuthContext);

    return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <Link to= "/"><div className="navbar-brand"> Budget Monkey </div></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                { isAuthenticated ? AuthenticatedNav() : UnauthenticatedNav()}
            </ul>
            </div>
        </div>
    </nav>)
}

export default NavBar