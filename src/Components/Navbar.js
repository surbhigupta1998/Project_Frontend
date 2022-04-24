import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css'
import { FaSignInAlt, FaUser } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../Actions/index";
//import Draft from "../component/showDraft"
//import { useStore } from "react-redux";
//import EditDraft from "../component/postDraft/EditDraft";
//import DraftPost from "../component/postDraft/ShowDraft";
function Navbar() {

    const { authtoken } = useSelector((state) => state.userReducer);
    const dispatch = useDispatch()
    const {setAuthtoken} = bindActionCreators(actionCreators,dispatch)

    const handleClick = () => {
        setAuthtoken(null)
    }
    
    return (
        <div>
            <nav className="navbar">
                <div className="logo"><Link to="/" style={{textDecoration:'none', color:'black'}}> Blog</Link></div>
                {authtoken ? (
                    <ul className="nav-links">
                        <div className="menu">
                            <Link to="/home" style={{textDecoration:'none'}}>Home</Link>
                            <Link to="/post" style={{textDecoration:'none'}}>Post</Link>
                            <Link to="/draft" style={{textDecoration:'none'}}>Draft</Link>
                            <Link to="/" onClick={handleClick} style={{textDecoration:'none'}}> <FaSignInAlt />Logout</Link>
                        </div>
                    </ul>
                ) : (
                    <ul className="nav-links">
                        <div className="menu">
                            <Link to="/register" style={{textDecoration:'none'}}> <FaUser />Register</Link>
                            <Link to="/login" style={{textDecoration:'none'}}> <FaSignInAlt />Login</Link>
                        </div>
                    </ul>
                )}
            </nav>
        </div>
    );
}
export default Navbar;