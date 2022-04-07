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
export const PostFailure = (error) => {
    return {
        type: "POST_FAILURE",
        payload: error
    }
}
