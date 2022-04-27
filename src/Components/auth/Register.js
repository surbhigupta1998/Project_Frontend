import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux'
import { toast } from 'react-toastify'
import { actionCreators } from '../../Actions/index'
import '../../styles/Auth.css'
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'

function Register() {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    })
    const dispatch = useDispatch();
    const { setAuthtoken } = bindActionCreators(actionCreators, dispatch)

    const navigate = useNavigate();

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.post('http://localhost:7000/user/register', data).then(response => {
            console.log(response.status)
            if (response.status === 200) {
                toast.success("Successfully register");
                setAuthtoken(response.data.authtoken);
                navigate('/home');
            } else {
                toast.error("Something went wrong");
            }
        }).catch(error => {
            if(typeof error.response.data.msg === "string")
                toast.error(error.response.data.msg);
            else
                toast.error(error.response.data.msg[0].msg);
        });
    }

    return (
        <div className='container-wrapper'>
            <div className='form-container'>
                <h4 className='form-heading'>Create Account</h4>
                <p className='signIn-text'>Already Have An Account?
                    <Link to="/login" className='link'> Sign In</Link></p>
                <form className='login-form' onSubmit={handleSubmit}>
                    <input type="text" placeholder='Username' name="name" value={data.name} onChange={handleChange} minLength={6} required/>
                    <input type="email" placeholder='E-mail' name="email" value={data.email} onChange={handleChange} required/>
                    <input type="password" placeholder='Password' name="password" value={data.password} onChange={handleChange} minLength={6} required/>
                    <button className='signup-btn' type='submit'>sign up </button>
                </form>
            </div>
        </div>
    );
}
export default Register;