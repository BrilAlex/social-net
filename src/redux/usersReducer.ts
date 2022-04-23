import {AppActionType, AppThunkType} from "./reduxStore";
import {followAPI, usersAPI} from "../api/api";

export type UserType = {
  id: number
  name: string
  status: string
  photos: {
    small: string
    large: string
  }
  followed: boolean
};

export type UsersInitStateType = typeof initialState;

export type UsersActionType =
  ReturnType<typeof followUser>
  | ReturnType<typeof unfollowUser>
  | ReturnType<typeof setUsers>
  | ReturnType<typeof setTotalUsersCount>
  | ReturnType<typeof setCurrentPage>
  | ReturnType<typeof toggleIsFetching>
  | ReturnType<typeof toggleFollowingProgress>;

const initialState = {
  users: [] as UserType[],
  totalUsersCount: 0,
  pageSize: 50,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>,
};

const FOLLOW_USER = "FOLLOW-USER";
const UNFOLLOW_USER = "UNFOLLOW-USER";
const SET_USERS = "SET-USERS";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_FOLLOWING_PROGRESS = "TOGGLE_FOLLOWING_PROGRESS";

// actionCreators
export const followUser = (user_ID: number) => ({type: FOLLOW_USER, user_ID} as const);
export const unfollowUser = (user_ID: number) => ({type: UNFOLLOW_USER, user_ID} as const);
export const setUsers = (users: UserType[]) => ({type: SET_USERS, users} as const);
export const setTotalUsersCount = (totalCount: number) => ({
  type: SET_TOTAL_USERS_COUNT, totalUsersCount: totalCount,
} as const);
export const setCurrentPage = (pageNumber: number) => ({type: SET_CURRENT_PAGE, currentPage: pageNumber} as const);
export const toggleIsFetching = (isFetching: boolean) => ({type: TOGGLE_IS_FETCHING, isFetching} as const);
export const toggleFollowingProgress = (inProgress: boolean, user_ID: number) => ({
  type: TOGGLE_FOLLOWING_PROGRESS, inProgress, user_ID,
} as const);

// thunkCreators
export const getUsers = (currentPage: number, pageSize: number): AppThunkType => (dispatch) => {
  dispatch(toggleIsFetching(true));
  usersAPI.getUsers(currentPage, pageSize).then(data => {
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
  });
};
export const follow = (user_ID: number): AppThunkType => (dispatch) => {
  dispatch(toggleFollowingProgress(true, user_ID));
  followAPI.follow(user_ID).then(data => {
    if (data.resultCode === 0) dispatch(followUser(user_ID));
    dispatch(toggleFollowingProgress(false, user_ID));
  });
};
export const unfollow = (user_ID: number): AppThunkType => (dispatch) => {
  dispatch(toggleFollowingProgress(true, user_ID));
  followAPI.unfollow(user_ID).then(data => {
    if (data.resultCode === 0) dispatch(unfollowUser(user_ID));
    dispatch(toggleFollowingProgress(false, user_ID));
  });
};

export const usersReducer = (state: UsersInitStateType = initialState, action: AppActionType): UsersInitStateType => {
  switch (action.type) {
    case FOLLOW_USER:
      return {
        ...state,
        users: state.users.map(u => u.id === action.user_ID ? {...u, followed: true} : u),
      };
    case UNFOLLOW_USER:
      return {
        ...state,
        users: state.users.map(u => u.id === action.user_ID ? {...u, followed: false} : u),
      };
    case SET_USERS:
      return {
        ...state,
        users: action.users,
      };
    case SET_TOTAL_USERS_COUNT:
      return {...state, totalUsersCount: action.totalUsersCount};
    case SET_CURRENT_PAGE:
      return {...state, currentPage: action.currentPage};
    case TOGGLE_IS_FETCHING:
      return {...state, isFetching: action.isFetching};
    case TOGGLE_FOLLOWING_PROGRESS:
      return {
        ...state,
        followingInProgress: action.inProgress
          ? [...state.followingInProgress, action.user_ID]
          : state.followingInProgress.filter(id => id !== action.user_ID)
      };
    default:
      return state;
  }
};