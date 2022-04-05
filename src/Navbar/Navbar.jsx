import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './Navbar.css'
import { FaSignInAlt, FaUser } from "react-icons/fa"
import Register from "../component/register";
import Login from "../component/login";
import Home from "../component/home";
function Navbar() {
    const [token, setToken] = useState('')
    useEffect(()=>{
        const token= localStorage.getItem('token')
        setToken(token)
        console.log(token)
    },[])
    return (
        <div>
            <Router>
                <nav className="navbar">
                    <div className="logo">Blog</div>
                    <ul className="nav-links">
                        <div className="menu">
                            <Link to ="/"> <FaUser />Register</Link>
                            <Link to ="/login"> <FaSignInAlt />Login</Link>

                        </div>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                </Routes>
            </Router>

        </div>
    );
}
export default Navbar;