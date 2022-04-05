import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerApi } from '../Action/action';
import './register.css'
import { useNavigate } from 'react-router-dom';
function Register() {
    const [state, setState] = useState({
        name: "",
        email: "",
        password: "",
    })
    const selector = useSelector(state => state.loginReducer.user)
    const dispatch = useDispatch();
    const navigate =useNavigate();
    const handleChange = (e) => {
        setState((state) => ({
            ...state, [e.target.name]: e.target.value
        }))
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        console.log(state)
        await dispatch(registerApi(state))
         .then((res) => {   
         if(res.register) {
             navigate('/login')
         }   
        });
    }
    return (
        <div className='container'>
            <div className='wrapper'>
                <form className='form-wrapper'>
                    <div>
                        <input
                            className='input'
                            type="text"
                            placeholder="Name"
                            name="name"
                            value={state.name}
                            onChange={handleChange}

                        />
                    </div>
                    <div>
                        <input
                            className='input'
                            type="text"
                            placeholder="Email"
                            name="email"
                            value={state.email}
                            onChange={handleChange}

                        />
                    </div>
                    <div>
                        <input
                            className='input'
                            type="text"
                            placeholder="Password"
                            name="password"
                            value={state.password}
                            onChange={handleChange}


                        />
                    </div>
                    <div>
                        <button className='btn' onClick={handleSubmit}>Register</button>
                

                    </div>
                </form>
            </div>
        </div>
    );
}
export default Register;