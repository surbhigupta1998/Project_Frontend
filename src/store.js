import {createStore, compose, applyMiddleware} from "redux";
import allReducer from "./Reducer/allReducer";
import thunk from "redux-thunk";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(allReducer, composeEnhancers(applyMiddleware(thunk)));
store.subscribe(()=> console.log("Redux => ",store.getState()));
export default store;