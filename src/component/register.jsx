import React from 'react';
import './register.css'
function Register(){
    return(
        <div className='container'> 
            <div className='wrapper'>
            <form className='form-wrapper'>
                <div>
                <input 
                className='input'
                type="text"
                placeholder = "Name"
                name ="name"
                />
                </div>
                <div>
                <input
                className='input' 
                type="text"
                placeholder = "Email"
                name ="email"
                />
                </div>
                <div>
                <input 
                className='input'
                type="text"
                placeholder = "Password"
                name ="password"
                />
                </div>
                <div>
                <button className='btn'>Register</button>
                </div>
            </form>
            </div>
        </div>
    );
}
export default Register;