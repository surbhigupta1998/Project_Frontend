import * as actionType from "../Action-Type/PostActionType";

const initialState = {
  publicPosts:{},
  privatePosts:{}
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_PRIVATE_POSTS:
      return { ...state, privatePosts: action.payload };
    case actionType.SET_PUBLIC_POSTS:
      return { ...state, publicPosts: action.payload };
    default:
      return state;
  }
};

export default postReducer;