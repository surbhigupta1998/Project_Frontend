import React, { useState } from 'react';
import './Login.css'
import { useDispatch } from 'react-redux';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../Actions/index';

function Login() {

    const [inputValues, setInputValues] = useState({
        email: "",
        password: ""
    })

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { setAuthtoken } = bindActionCreators(actionCreators, dispatch);

    const handleChange = (e) => {
        setInputValues({ ...inputValues, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:7000/blog/login', inputValues).then(response => {
            if (response.status === 200) {
                setAuthtoken(response.data.authtoken);
                toast.success("Logged in Successfully");
                navigate("/post")
            } else {
                toast.info("Wrong Credentials")
            }
        }).catch(error => {
            if(typeof error.response.data.msg === "string")
                toast.error(error.response.data.msg);
            else
                toast.error(error.response.data.msg[0].msg);
        })
    }

    return (
        <div className='container-wrapper'>
            <div className='form-container'>
                <h4 className='form-heading'>Login Here</h4>
                <p className='signIn-text'>New on Blog App?
                    <Link to="/register" className='link'> Sign Up</Link></p>
                <form className='login-form' onSubmit={handleSubmit}>
                    <input type="email" placeholder='E-mail' name="email" value={inputValues.email} onChange={handleChange} required/>
                    <input type="password" placeholder='Password' name="password" value={inputValues.password} onChange={handleChange} minLength={6} required/>
                    <button className='signup-btn' type='submit'>login </button>
                </form>
            </div>
        </div>
    );
}
export default Login;