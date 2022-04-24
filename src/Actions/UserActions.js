import * as actionType from "../Action-Type/UserActionType";

export function setAuthtoken(authtoken) {
  return (dispatch) => {
    dispatch({
      type: actionType.SET_AUTHTOKEN,
      payload: authtoken
    })
  }
}