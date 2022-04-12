import { combineReducers } from "redux";
import loginReducer from "./reducer";
import postReducer from "./postReducer";

const allReducer = combineReducers({
    loginReducer,
    postReducer
    //import reducer
});

export default allReducer;