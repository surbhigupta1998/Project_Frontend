import * as actionType from "../Action-Type/PostActionType";

export function setPrivatePosts(posts) {
  return (dispatch) => {
    dispatch({
      type: actionType.SET_PRIVATE_POSTS,
      payload: posts
    })
  }
}

export function setPublicPosts(posts) {
    return (dispatch) => {
      dispatch({
        type: actionType.SET_PUBLIC_POSTS,
        payload: posts
      })
    }
}