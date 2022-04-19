import axios from 'axios';

export const PostStart = () => {
    return {

        type: "POST_START",
    }
}
export const PostSuccess = (users) => {
    return {
        type: "POST_SUCCESS",
        payload: users
    }
}

export const saveToDraft = (post) => {
    return {
        type: "DRAFT_POST",
        payload: post
    }
}
export const PostFailure = (error) => {
    return {
        type: "POST_FAILURE",
        payload: error
    }
}

export const postFetchUser = (post) =>   {
    return async (dispatch) => {
        try{
            // dispatch(PostStart())
            const response = await axios.post('http://localhost:7000/posts/create', post)
            console.log(response)
            //localStorage.setItem('token', response.data)
            // dispatch(PostSuccess(response.data))
            return true;
        }
        catch(error){
            // dispatch(PostFailure(error))
            console.log(error)
            //return{post : false}
        }
    }
}

export const postFetch = () => {
    return async dispatch => {
        try {
            dispatch(PostStart);
            const response = await axios.get('http://localhost:7000/posts');

            dispatch(PostSuccess(response.data));
            // console.log(response.data);
            return true;
            
        }
        catch(error){
            dispatch(PostFailure(error.message));
            return { res : false }
        }
    }
}