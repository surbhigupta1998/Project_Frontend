import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux'
import { toast } from 'react-toastify'
import { actionCreators } from '../Actions/index'
import './Register.css'
import { useNavigate } from 'react-router-dom';
import { FaSignInAlt } from "react-icons/fa";
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
        axios.post('http://localhost:7000/blog/register', data).then(response => {
            if (response.status === 200) {
                toast.success("Successfully register");
                setAuthtoken(response.data.authtoken);
                navigate('/home');
            } else {
                toast.error("Something went wrong");
            }
        }).catch(error => {
            toast.error(error.response.data.msg);
        });
    }

    return (
        <div className='container-wrapper'>
            <div className='app-wrapper'>
                <form className='form-app-wrapper'>
                    <div>
                        <input
                            className='inputvalues'
                            type="text"
                            placeholder="Name"
                            name="name"
                            value={data.name}
                            onChange={handleChange}

                        />
                    </div>
                    <div>
                        <input
                            className='inputvalues'
                            type="text"
                            placeholder="Email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}

                        />
                    </div>
                    <div>
                        <input
                            className='inputvalues'
                            type="text"
                            placeholder="Password"
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <button className='btn' onClick={handleSubmit} ><FaSignInAlt />Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Register;