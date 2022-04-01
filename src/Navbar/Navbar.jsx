import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './Navbar.css'
import { FaSignInAlt, FaUser } from "react-icons/fa"
import Register from "../component/register";
import Login from "../component/login";
function Navbar() {
    return (
        <div>
            <Router>
                <nav className="navbar">
                    <div className="logo">Blog</div>
                    <ul className="nav-links">
                        <div className="menu">
                            <a href="/"> <FaUser />Register</a>
                            <a href="/login"> <FaSignInAlt />Login</a>
                        </div>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </Router>

        </div>
    );
}
export default Navbar;