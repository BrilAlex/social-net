import {ActionType} from "./reduxStore";

export type PostType = {
  id: number
  postText: string
  likesCount: number
};

export type ProfileInitStateType = typeof initialState;

export type ProfileActionType =
  ReturnType<typeof addPostAC> | ReturnType<typeof updateNewPostTextAC>;

const initialState = {
  posts: [
    {id: 1, postText: "It's my first post", likesCount: 20},
    {id: 2, postText: "Hi! How are you?", likesCount: 10},
  ] as Array<PostType>,
  newPostText: "",
};

export const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
export const ADD_POST = "ADD-POST";

export const updateNewPostTextAC = (text: string) => ({type: UPDATE_NEW_POST_TEXT, text} as const);

export const addPostAC = () => ({type: ADD_POST} as const);

export const profileReducer = (state = initialState, action: ActionType): ProfileInitStateType => {
  switch (action.type) {
    case UPDATE_NEW_POST_TEXT: {
      return {
        ...state,
        newPostText: action.text,
      };
    }
    case ADD_POST: {
      const newPost: PostType = {
        id: state.posts.length + 1,
        postText: state.newPostText,
        likesCount: 0
      };

      return {
        ...state,
        posts: [...state.posts, newPost],
        newPostText: "",
      };
    }
    default:
      return state;
  }
};