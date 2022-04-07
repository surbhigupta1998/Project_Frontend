import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerApi } from '../Action/action';
import './register.css'
import { useNavigate } from 'react-router-dom';
function Register() {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    })
    const selector = useSelector(state => state.loginReducer.user)
    const dispatch = useDispatch();
    const navigate =useNavigate();
    const handleChange = (e) => {
        setData((data) => ({
            ...data, [e.target.name]: e.target.value
        }))
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        console.log(data)
        await dispatch(registerApi(data))
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
                            value={data.name}
                            onChange={handleChange}

                        />
                    </div>
                    <div>
                        <input
                            className='input'
                            type="text"
                            placeholder="Email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}

                        />
                    </div>
                    <div>
                        <input
                            className='input'
                            type="text"
                            placeholder="Password"
                            name="password"
                            value={data.password}
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