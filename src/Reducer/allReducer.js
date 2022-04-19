import { combineReducers } from "redux";
import loginReducer from "./reducer";
import postReducer from "./postReducer";

const allReducer = combineReducers({
    user:loginReducer,
    postReducer
    //import reducer
});

export default allReducer;