import {ActionTypes, AppThunkType} from "./reduxStore";
import {followAPI, usersAPI} from "../api/api";

/*export type UserType = {
    id: number
    fullName: string
    avatarUrl: string
    location: {country: string, city: string}
    status: string
    followed: boolean
};*/

export type UserType = {
    id: number
    name: string
    status: string
    photos: {small: string, large: string}
    followed: boolean
};

export type UsersPageType = typeof initialState;

export type UsersActionTypes =
    ReturnType<typeof followAC> |
    ReturnType<typeof unfollowAC> |
    ReturnType<typeof setUsers> |
    ReturnType<typeof setCurrentPage> |
    ReturnType<typeof setTotalUsersCount> |
    ReturnType<typeof toggleIsFetching> |
    ReturnType<typeof toggleFollowingProgress>;

let initialState = {
    usersData: [] as Array<UserType>,
    pageSize: 50,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>
};

const FOLLOW_USER = "FOLLOW_USER";
const UNFOLLOW_USER = "UNFOLLOW_USER";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_FOLLOWING_PROGRESS = "TOGGLE_FOLLOWING_PROGRESS";

export const followAC = (userID: number) => ({type: FOLLOW_USER, id: userID} as const);
export const unfollowAC = (userID: number) => ({type: UNFOLLOW_USER, id: userID} as const);
export const setUsers = (users: Array<UserType>) => ({type: SET_USERS, users} as const);
export const setCurrentPage = (currentPage: number) =>
    ({type: SET_CURRENT_PAGE, currentPage} as const);
export const setTotalUsersCount = (totalUsersCount: number) =>
    ({type: SET_TOTAL_USERS_COUNT, totalUsersCount} as const);
export const toggleIsFetching = (isFetching: boolean) =>
    ({type: TOGGLE_IS_FETCHING, isFetching} as const);
export const toggleFollowingProgress = (followingInProgress: boolean, userID: number) =>
    ({type: TOGGLE_FOLLOWING_PROGRESS, followingInProgress, userID} as const);

export const getUsers = (currentPage: number, pageSize: number): AppThunkType => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true));
        usersAPI.getUsersData(currentPage, pageSize).then(data => {
            dispatch(toggleIsFetching(false));
            dispatch(setUsers(data.items));
            dispatch(setTotalUsersCount(data.totalCount));
        });
    };
};

export const follow = (userID: number): AppThunkType => {
    return (dispatch) => {
        dispatch(toggleFollowingProgress(true, userID));
        followAPI.followUser(userID).then(data => {
            if (data.resultCode === 0) {
                dispatch(followAC(userID));
            }
            dispatch(toggleFollowingProgress(false, userID));
        });
    };
};
export const unfollow = (userID: number): AppThunkType => {
    return (dispatch) => {
        dispatch(toggleFollowingProgress(true, userID));
        followAPI.unfollowUser(userID).then(data => {
            if (data.resultCode === 0) {
                dispatch(unfollowAC(userID));
            }
            dispatch(toggleFollowingProgress(false, userID));
        });
    };
};

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
            return {...state, usersData: action.users};
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage};
        case SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.totalUsersCount};
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching};
        case TOGGLE_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.followingInProgress
                    ? [...state.followingInProgress, action.userID]
                    : state.followingInProgress.filter(id => id !== action.userID)
            };
        default:
            return state;
    }
}