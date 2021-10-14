import {ActionTypes} from "./reduxStore";

export type UserType = {
    id: number
    fullName: string
    avatarUrl: string
    location: {country: string, city: string}
    status: string
    followed: boolean
};

export type UsersPageType = typeof initialState;

export type UsersActionTypes =
    ReturnType<typeof followAC> |
    ReturnType<typeof unfollowAC> |
    ReturnType<typeof setUsersAC>;

let initialState = {
    usersData: [] as Array<UserType>
};

const FOLLOW_USER = "FOLLOW_USER";
const UNFOLLOW_USER = "UNFOLLOW_USER";
const SET_USERS = "SET_USERS"

export const followAC = (userID: number) => ({type: FOLLOW_USER, id: userID} as const);
export const unfollowAC = (userID: number) => ({type: UNFOLLOW_USER, id: userID} as const);
export const setUsersAC = (users: Array<UserType>) => ({type: SET_USERS, users} as const);

export const usersReducer = (state: UsersPageType = initialState, action: ActionTypes): UsersPageType => {
    switch(action.type) {
        case FOLLOW_USER:
            return {
                ...state,
                usersData: state.usersData.map(u => u.id === action.id ? {...u, followed: true} : u)
            };
        case UNFOLLOW_USER:
            return {
                ...state,
                usersData: state.usersData.map(u => u.id === action.id ? {...u, followed: false} : u)
            };
        case SET_USERS:
            return {...state, usersData: [...state.usersData, ...action.users]}
        default:
            return state;
    }
}