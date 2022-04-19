import axios from 'axios';
import { toast } from 'react-toastify';

export const LoginStart = () => {
    return {

        type: "LOGIN_START",
    }
}
export const LoginSuccess = (users) => {
    return {
        type: "LOGIN_SUCCESS",
        payload: users,
    }
}
export const LoginFailure = (error) => {
    return {
        type: "LOGIN_FAILURE",
        payload: error
    }
}
export const registerApi = (data) => {
    return async () => {
        try {
            const response = await axios.post('http://localhost:7000/blog/register',data);
            console.log(response.data);
            toast.success("successfully register");
             return {register:true}
        }
        catch (error) {
            console.log(error)
            toast.error(error.response.data);
            return {register:false}
        }
    }
}

export const loginFetchUser = (inputValues) =>   {
    return async (dispatch) => {
        try{
            dispatch(LoginStart())
            const {data} = await axios.post('http://localhost:7000/blog/login', inputValues)
            const {token, users} = data;
            console.log("action-user",users);
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(users))
            dispatch(LoginSuccess(users))
            toast.success("successfully login");
            return{ login : true}
        }
        catch(error){
            dispatch(LoginFailure(error))
            toast.error(error);
            return{login : false}
        }
    }
}
