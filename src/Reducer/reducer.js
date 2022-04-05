const initialState = {
    loading: null,
    users: {},
    error: "",
}

const loginReducer = (state = initialState,action) =>{
    switch (action.type){
        case "LOGIN_START":
            return{
                ...state,
                loading: true,
            };
        case "LOGIN_SUCCESS":
            return{
                ...state,
                loading: false,
                users: action.playload,
                error: "",
            };
        case "LOGIN_FAILURE":
            return{
                loading: false,
                users: {},
                error: action.payload,
            };
        default:
            return state;
    }
};
export default loginReducer;