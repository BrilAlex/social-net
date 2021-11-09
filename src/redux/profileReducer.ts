import {ActionTypes, AppThunkType} from "./reduxStore";
import {profileAPI} from "../api/api";

export type PostType = {
    id: number
    postText: string
    likesCounter: number
};

export type ProfileType = {
    userId: number
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
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
    photos:{small: string, large: string}
}

export type ProfilePageType = typeof initialState;

export type ProfileActionTypes =
    ReturnType<typeof addNewPostAC> |
    ReturnType<typeof updateNewPostTextAC> |
    ReturnType<typeof setUserProfile>;

let initialState = {
    profile: {} as ProfileType,
    postsData: [
        {id: 1, postText: "Some text 1", likesCounter: 0},
        {id: 2, postText: "Some text 2", likesCounter: 15},
        {id: 3, postText: "Some text 3", likesCounter: 1},
        {id: 4, postText: "Some text 4", likesCounter: 10},
        {id: 5, postText: "Some text 5", likesCounter: 5},
    ],
    newPostText: "",
};

const ADD_NEW_POST = "ADD_NEW_POST";
const UPDATE_NEW_POST_TEXT = "UPDATE_NEW_POST_TEXT";
const SET_USER_PROFILE = "SET_USER_PROFILE";

export const addNewPostAC = () => ({type: ADD_NEW_POST} as const);
export const updateNewPostTextAC = (text: string) => (
    {type: UPDATE_NEW_POST_TEXT, newText: text} as const
);
export const setUserProfile = (profile: ProfileType) => ({type: SET_USER_PROFILE, profile} as const);

export const getUserProfile = (userID: string): AppThunkType =>
    (dispatch) => {
    profileAPI.getProfileData(userID).then(data => {
        dispatch(setUserProfile(data));
    });
};

const profileReducer = (state: ProfilePageType = initialState, action: ActionTypes): ProfilePageType => {
    switch(action.type) {
        case ADD_NEW_POST:
            let newPost: PostType = {
                id: 6,
                postText: state.newPostText,
                likesCounter: 0
            };
            return {...state, postsData: [...state.postsData, newPost], newPostText: ""};
        case UPDATE_NEW_POST_TEXT:
            return {...state, newPostText: action.newText};
        case SET_USER_PROFILE:
            return {...state, profile: action.profile};
        default:
            return state;
    }
}

export default profileReducer;