import React,{useState}from 'react';
import './login.css'
import { useDispatch, useSelector } from 'react-redux';
import { loginFetchUser} from '../Action/action';
import { FaSignInAlt} from "react-icons/fa"
import { useNavigate } from 'react-router-dom';
import {Link} from "react-router-dom"
function Login() {
    const userlogin ={
        email : "",
        password : ""
    }
    const [inputValues, setInputValues] = useState(userlogin)
    const users = useSelector((state) => state.user.users)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleChange = (e) => {
        setInputValues((inputValues) => ({
            ...inputValues, [e.target.name]: e.target.value
        }))
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        console.log(inputValues)
        await dispatch(loginFetchUser(inputValues))
        .then((res) => {   
            if(res.login) {
                navigate("/post")
            }   
           });
    }
    
    return (
        <div className='container_wrapper'>
            <div className='wrapper'>
                <form className='form-wrapper'>
                    <div>
                        <input
                            className='input'
                            type="text"
                            placeholder="Email"
                            name="email"
                            value={inputValues.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <input
                            className='input'
                            type="text"
                            placeholder="Password"
                            name="password"
                            value={inputValues.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <button className='btn' as={Link} to="/home" onClick={handleSubmit} ><FaSignInAlt />Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Login;