import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './Navbar.css'
import { FaSignInAlt, FaUser } from "react-icons/fa"
import Register from "../component/register";
import Login from "../component/login";
import Home from "../component/home";
import Post from "../component/post";
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
                    {token ?(
                    <ul className="nav-links">
                        <div className="menu">
                            <Link to ="/post">Post</Link>
                            <Link to ="/login" onClick={()=> localStorage.removeItem('token') }> <FaSignInAlt />Logout</Link>
                        </div>
                    </ul>
                    ): (
                    <ul className="nav-links">
                        <div className="menu">
                            <Link to ="/"> <FaUser />Register</Link>
                            <Link to ="/login"> <FaSignInAlt />Login</Link>


                        </div>
                    </ul>
                    )}
                </nav>
                <Routes>
                    <Route path="/" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/post" element={<Post />} />
                </Routes>
            </Router>

        </div>
    );
}
export default Navbar;