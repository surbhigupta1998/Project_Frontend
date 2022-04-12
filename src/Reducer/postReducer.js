// create reducers
const initialState = {
    loading: null,
    users: {},
    error: "",
}

const postReducer = (state = initialState,action) =>{
    switch (action.type){
        case "POST_START":
            return{
                ...state,
                loading: true,
            };
        case "POST_SUCCESS":
            return{
                ...state,
                loading: false,
                users: action.playload,
                error: "",
            };
        case "POST_FAILURE":
            return{
                loading: false,
                users: {},
                error: action.payload,
            };
        default:
            return state;
    }
};
export default postReducer;