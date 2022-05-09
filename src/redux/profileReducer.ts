import {AppActionType, AppThunkType} from "./reduxStore";
import {profileAPI} from "../api/api";

export type PostType = {
  id: number
  postText: string
  likesCount: number
};

export type ProfileType = {
  userId: number
  aboutMe: string
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
  ReturnType<typeof addNewPostAC>
  | ReturnType<typeof setUserProfile>
  | ReturnType<typeof setUserStatus>;

const initialState = {
  profile: {} as ProfileType,
  posts: [
    {id: 1, postText: "It's my first post", likesCount: 20},
    {id: 2, postText: "Hi! How are you?", likesCount: 10},
  ] as Array<PostType>,
  status: "",
};

const ADD_NEW_POST = "ADD-NEW-POST";
const SET_USER_PROFILE = "SET-USER-PROFILE";
const SET_USER_STATUS = "SET-USER-STATUS";

// actionCreators
export const addNewPostAC = (newPostText: string) => ({type: ADD_NEW_POST, newPostText} as const);
export const setUserProfile = (profile: ProfileType) => ({
  type: SET_USER_PROFILE,
  profile
} as const);
export const setUserStatus = (status: string) => ({type: SET_USER_STATUS, status} as const);

// thunkCreators
export const getUserProfile = (user_ID: string): AppThunkType => (dispatch) => {
  profileAPI.getUserProfile(user_ID).then(data => dispatch(setUserProfile(data)));
};
export const getUserStatus = (user_ID: string): AppThunkType => {
  return (dispatch) => {
    profileAPI.getUserStatus(user_ID).then(data => dispatch(setUserStatus(data)));
  };
};
export const updateUserStatus = (newStatus: string): AppThunkType => {
  return (dispatch) => {
    profileAPI.updateUserStatus(newStatus)
      .then(data => {
        if (data.resultCode === 0) {
          dispatch(setUserStatus(newStatus));
        }
      });
  };
};

export const profileReducer = (state: ProfileInitStateType = initialState, action: AppActionType): ProfileInitStateType => {
  switch (action.type) {
    case ADD_NEW_POST: {
      const newPost: PostType = {
        id: state.posts.length + 1,
        postText: action.newPostText,
        likesCount: 0
      };

      return {
        ...state,
        posts: [...state.posts, newPost],
      };
    }
    case SET_USER_PROFILE: {
      return {...state, profile: action.profile};
    }
    case SET_USER_STATUS: {
      return {...state, status: action.status};
    }
    default:
      return state;
  }
};