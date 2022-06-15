import {AppThunkType} from "./reduxStore";
import {PhotosType, profileAPI} from "../api/api";

// Types
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
  photos: PhotosType
};
export type ProfileInitStateType = typeof initialState;
export type ProfileActionsType =
  | ReturnType<typeof addNewPostAC>
  | ReturnType<typeof deletePostAC>
  | ReturnType<typeof setUserProfile>
  | ReturnType<typeof setUserStatus>
  | ReturnType<typeof setUserPhotos>;

// Initial state
const initialState = {
  profile: null as ProfileType | null,
  posts: [
    {id: 1, postText: "It's my first post", likesCount: 20},
    {id: 2, postText: "Hi! How are you?", likesCount: 10},
  ] as Array<PostType>,
  status: "",
};

// Constants
const ADD_NEW_POST = "social-net/profile/ADD-NEW-POST";
const DELETE_POST = "social-net/profile/DELETE-POST";
const SET_USER_PROFILE = "social-net/profile/SET-USER-PROFILE";
const SET_USER_STATUS = "social-net/profile/SET-USER-STATUS";
const SET_USER_PHOTOS = "social-net/profile/SET-USER-PHOTOS";

// Action Creators
export const addNewPostAC = (newPostText: string) =>
  ({type: ADD_NEW_POST, newPostText} as const);
export const deletePostAC = (post_ID: number) =>
  ({type: DELETE_POST, post_ID} as const);
export const setUserProfile = (profile: ProfileType) =>
  ({type: SET_USER_PROFILE, profile} as const);
export const setUserStatus = (status: string) =>
  ({type: SET_USER_STATUS, status} as const);
export const setUserPhotos = (photos: PhotosType) =>
  ({type: SET_USER_PHOTOS, photos} as const);

// Thunk Creators
export const getUserProfile = (user_ID: number): AppThunkType => async (dispatch) => {
  let data = await profileAPI.getUserProfile(user_ID);

  dispatch(setUserProfile(data));
};
export const getUserStatus = (user_ID: number): AppThunkType => async (dispatch) => {
  let data = await profileAPI.getUserStatus(user_ID);
  dispatch(setUserStatus(data));
};
export const updateUserStatus = (newStatus: string): AppThunkType => async (dispatch) => {
  let data = await profileAPI.updateUserStatus(newStatus);
  if (data.resultCode === 0) {
    dispatch(setUserStatus(newStatus));
  }
};
export const saveAvatar = (file: File): AppThunkType => async (dispatch) => {
  let data = await profileAPI.saveUserAvatar(file);
  if (data.resultCode === 0) {
    dispatch(setUserPhotos(data.data.photos));
  }
};

export const profileReducer = (state: ProfileInitStateType = initialState, action: ProfileActionsType): ProfileInitStateType => {
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
    case DELETE_POST: {
      return {...state, posts: state.posts.filter(p => p.id !== action.post_ID)};
    }
    case SET_USER_PROFILE: {
      return {...state, profile: action.profile};
    }
    case SET_USER_STATUS: {
      return {...state, status: action.status};
    }
    case SET_USER_PHOTOS: {
      return {...state, profile: {...state.profile, photos: action.photos} as ProfileType};
    }
    default:
      return state;
  }
};
