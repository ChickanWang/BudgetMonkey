import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {AuthContext} from '../Context/AuthContext'
import AuthService from '../Services/AuthService'

function NavBar() {
    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);

    function Logout() {
        AuthService.logout().then(() => {
            setIsAuthenticated(false);
        })

    }

    return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <div className="navbar-brand"> BudgetMonkey </div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                
                { isAuthenticated ?

                // Authenticated Navbar
                <> 
                    <Link to= "/user/expense">
                        <li className="nav-item nav-link">
                            Add Expense
                        </li>
                    </Link>

                    <Link to= "/user/spendings" >
                        <li className="nav-item nav-link">
                            View Spendings
                        </li>
                    </Link>

                    <Link to= "/user/stats">
                        <li className="nav-item nav-link">
                            View Stats
                        </li>
                    </Link>
                </>
                
                // Unauthenticated Navbar
                :<>
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
                </>}
            </ul>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ml-auto">
            { isAuthenticated ?
                <Link to= "/"><button className = "btn btn-link nav-item nav-link" onClick={Logout}>Logout</button></Link> 
            : <div></div>}
            </ul>

            </div>
        </div>
    </nav>)
}

export default NavBar