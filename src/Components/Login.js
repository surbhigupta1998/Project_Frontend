import React,{useState}from 'react';
import './Login.css'
import { useDispatch } from 'react-redux';
import axios from 'axios'
import { FaSignInAlt} from "react-icons/fa"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../Actions/index';

function Login() {

    const [inputValues, setInputValues] = useState({
        email : "",
        password : ""
    })

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {setAuthtoken} = bindActionCreators(actionCreators,dispatch);
    
    const handleChange = (e) => {
        setInputValues({ ...inputValues, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:7000/blog/login', inputValues).then(response=>{
            if(response.status === 200){
                setAuthtoken(response.data.authtoken);
                toast.success("Logged in Successfully");
                navigate("/post")
            }else{
                toast.info("Wrong Credentials")
            }
        }).catch(error=>{
            toast.info(error.response.data.msg);
        })    
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
                        <button className='btn' type='button' onClick={handleSubmit} ><FaSignInAlt />Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Login;