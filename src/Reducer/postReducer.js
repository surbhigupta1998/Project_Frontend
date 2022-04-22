// create reducers
const initialState = {
    loading: null,
    users: [],
    error: "",
    draftPost:[],
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
                users: action.payload,
                error: "",
            };
        case "POST_FAILURE":
            return{
                loading: false,
                users: {},
                error: action.payload,
            };
        case "DRAFT_POST":
            return{
                ...state,
                draftPost:[...state.draftPost, action.payload],
            };
        default:
            return state;
    }
};
export default postReducer;