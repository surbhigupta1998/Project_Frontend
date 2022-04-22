import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './Navbar.css'
import { FaSignInAlt, FaUser } from "react-icons/fa"
import Register from "../component/register";
import Login from "../component/login";
import Home from "../component/home";
import Post from "../component/post";
//import Draft from "../component/showDraft"
import DraftPost from "../component/showDraft";
//import { useStore } from "react-redux";
//import EditDraft from "../component/postDraft/EditDraft";
//import DraftPost from "../component/postDraft/ShowDraft";
function Navbar() {
    const [token, setToken] = useState('')
    const [user,setUser]= useState('')
    const handleClick = () => {
        localStorage.removeItem('token',token)
        localStorage.removeItem('user',user)

    }
    useEffect(()=>{
        const token= localStorage.getItem('token')
        const users= JSON.parse(localStorage.getItem('user'))
        setToken(token)
        setUser(users)
        console.log(token)
        console.log("NAvbar-user",user)
    },[token])
    return (
        <div>
            <Router>
                <nav className="navbar">
                    <div className="logo">Blog</div>
                    {token ?(
                    <ul className="nav-links">
                        <div className="menu">
                            <Link to ="/home" >Home</Link>
                            <Link to ="/post">Post</Link>
                            <Link to ="/draft">Draft</Link>
                            <Link to ="/login" onClick={handleClick}> <FaSignInAlt />Logout</Link>
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
                    <Route path="/draft" element={<DraftPost />} />
                </Routes>
            </Router>

        </div>
    );
}
export default Navbar;