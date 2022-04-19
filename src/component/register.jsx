import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerApi } from '../Action/action';
import './register.css'
import { useNavigate } from 'react-router-dom';
import { FaSignInAlt} from "react-icons/fa"
function Register() {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    })
    const selector = useSelector(state => state.user.users)
    const dispatch = useDispatch();
    const navigate =useNavigate();
    const handleChange = (e) => {
        setData((data) => ({
            ...data, [e.target.name]: e.target.value
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data)
        dispatch(registerApi(data))
         .then((res) => {   
         if(res.register) {
             navigate('/login')
         }   
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