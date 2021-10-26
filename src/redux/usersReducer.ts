import {ActionTypes} from "./reduxStore";

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
    ReturnType<typeof setUsersAC> |
    ReturnType<typeof setCurrentPageAC> |
    ReturnType<typeof setTotalUsersCountAC> |
    ReturnType<typeof toggleIsFetchingAC>;

let initialState = {
    usersData: [] as Array<UserType>,
    pageSize: 50,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
};

const FOLLOW_USER = "FOLLOW_USER";
const UNFOLLOW_USER = "UNFOLLOW_USER";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";

export const followAC = (userID: number) => ({type: FOLLOW_USER, id: userID} as const);
export const unfollowAC = (userID: number) => ({type: UNFOLLOW_USER, id: userID} as const);
export const setUsersAC = (users: Array<UserType>) => ({type: SET_USERS, users} as const);
export const setCurrentPageAC = (currentPage: number) =>
    ({type: SET_CURRENT_PAGE, currentPage} as const);
export const setTotalUsersCountAC = (totalUsersCount: number) =>
    ({type: SET_TOTAL_USERS_COUNT, totalUsersCount} as const);
export const toggleIsFetchingAC = (isFetching: boolean) =>
    ({type: TOGGLE_IS_FETCHING, isFetching} as const);

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
        default:
            return state;
    }
}