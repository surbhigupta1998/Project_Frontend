import { combineReducers } from "redux";
import loginReducer from "./reducer";

const allReducer = combineReducers({
    loginReducer,
});

export default allReducer;