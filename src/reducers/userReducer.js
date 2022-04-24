import * as actionType from "../Action-Type/UserActionType";

const initialState = {
  authtoken: ""
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_AUTHTOKEN:
      return { ...state, authtoken: action.payload };
    default:
      return state;
  }
};

export default userReducer;