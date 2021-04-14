import React from 'react';
import {Link} from 'react-router-dom';
import './nav.css';

const Nav = ({isAthenticated,logoutHandler, username})=>{
  
    return(
        <ul className="menu">
        <li>
            <Link to="/" className="item">
                Home page
            </Link>
        </li>
        {isAthenticated ? (
            <>
                <li>
                    <Link
                        onClick={logoutHandler}
                        to="/auth"
                        className="item"
                    >
                        logout
                    </Link>
                </li>

                <li>
                    <Link to="/todolist" className="item">
                        todo list
                    </Link>
                </li>
            </>
        ) : (
            <li>
                <Link to="/auth" className="item">
                    login / Signup
                </Link>
            </li>
        )}

        {isAthenticated ? (
            <p className="wellcome">hello dear {username}</p>
        ) : (
            <p className="wellcome">:)</p>
        )}
    </ul>
    )
}

export default Nav;