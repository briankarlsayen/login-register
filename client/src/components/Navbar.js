import React from 'react'
import {
  Link
} from "react-router-dom";
import { useLocation } from 'react-router-dom'

function Navbar({isLogged, setIsLogged}) {
  const site = useLocation()
  return (
    <nav className="navbar">
      <ul>
        <li className={site.pathname === '/' ? "tab active" : "tab"}>
          <Link  to="/">Home</Link>
        </li>
        <li className={site.pathname === '/register' ? "tab active" : "tab"}>
          <Link  to="/register">Register</Link>
        </li>
        {isLogged &&
          <li className={site.pathname === '/change-pass' ? "tab active" : "tab"} >
            <Link to="/change-password">Change Password</Link>
          </li>
        }
        <li className={site.pathname === '/login' ? "tab active" : "tab"}>
          {isLogged ?
          <Link  to="/" onClick={()=>{
            localStorage.clear() 
            setIsLogged(false)
          }}>Logout</Link>:
          <Link to="/login">Login</Link>
          }
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
