import {ActionType} from "./reduxStore";

export type PostType = {
  id: number
  postText: string
  likesCount: number
};

export type ProfileType = {
  userId: number
  lookingForAJob: boolean
  lookingForAJobDescription: string
  fullName: string
  contacts: {
    github: string
    vk?: string
    facebook?: string
    instagram?: string
    twitter?: string
    website?: string
    youtube?: string
    mainLink?: string
  }
  photos: {
    small: string
    large: string
  }
};

export type ProfileInitStateType = typeof initialState;

export type ProfileActionType =
  ReturnType<typeof addPostAC> | ReturnType<typeof updateNewPostTextAC> | ReturnType<typeof setUserProfile>;

const initialState = {
  profile: {} as ProfileType,
  posts: [
    {id: 1, postText: "It's my first post", likesCount: 20},
    {id: 2, postText: "Hi! How are you?", likesCount: 10},
  ] as Array<PostType>,
  newPostText: "",
};

const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET-USER-PROFILE";

export const updateNewPostTextAC = (text: string) => ({type: UPDATE_NEW_POST_TEXT, text} as const);
export const addPostAC = () => ({type: ADD_POST} as const);
export const setUserProfile = (profile: ProfileType) => ({type: SET_USER_PROFILE, profile} as const);

export const profileReducer = (state: ProfileInitStateType = initialState, action: ActionType): ProfileInitStateType => {
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
    case SET_USER_PROFILE: {
      return {...state, profile: action.profile};
    }
    default:
      return state;
  }
};