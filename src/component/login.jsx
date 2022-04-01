import React from 'react';
import './login.css'
import { FaSignInAlt} from "react-icons/fa"
function Login() {
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
                        />
                    </div>
                    <div>
                        <input
                            className='input'
                            type="text"
                            placeholder="Email"
                            name="email"
                        />
                    </div>
                    <div>
                        <button className='btn'><FaSignInAlt />Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Login;