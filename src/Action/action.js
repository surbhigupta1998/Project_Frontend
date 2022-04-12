import axios from 'axios';

export const LoginStart = () => {
    return {

        type: "LOGIN_START",
    }
}
export const LoginSuccess = (users) => {
    return {
        type: "LOGIN_SUCCESS",
        payload: users
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
            const response = await axios.post('http://localhost:5000/blog/register',data);
            console.log(response.data);
             return {register:true}
        }
        catch (error) {
            console.log(error)
            return {register:false}
        }
    }
}

export const loginFetchUser = (inputValues) =>   {
    return async (dispatch) => {
        try{
            dispatch(LoginStart())
            const response = await axios.post('http://localhost:7000/blog/login', inputValues)
            console.log(response)
            localStorage.setItem('token', response.data)
            dispatch(LoginSuccess(response.data.users))
            return{login : true}
        }
        catch(error){
            dispatch(LoginFailure(error))
            console.log(error)
            return{login : false}
        }
    }
}
