import {AppThunkType} from "./store";
import {APIResponseType, followAPI, usersAPI} from "../api/api";
import {Dispatch} from "redux";
import {updateObjectInArray} from "../utils/objectHelpers";

// Types
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
export type UsersActionsType =
  ReturnType<typeof followUser>
  | ReturnType<typeof unfollowUser>
  | ReturnType<typeof setUsers>
  | ReturnType<typeof setTotalUsersCount>
  | ReturnType<typeof setCurrentPage>
  | ReturnType<typeof toggleIsFetching>
  | ReturnType<typeof toggleFollowingProgress>;

// Initial state
const initialState = {
  users: [] as UserType[],
  totalUsersCount: 0,
  pageSize: 50,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>,
};

// Constants
const FOLLOW_USER = "social-net/users/FOLLOW-USER";
const UNFOLLOW_USER = "social-net/users/UNFOLLOW-USER";
const SET_USERS = "social-net/users/SET-USERS";
const SET_TOTAL_USERS_COUNT = "social-net/users/SET_TOTAL_USERS_COUNT";
const SET_CURRENT_PAGE = "social-net/users/SET_CURRENT_PAGE";
const TOGGLE_IS_FETCHING = "social-net/users/TOGGLE_IS_FETCHING";
const TOGGLE_FOLLOWING_PROGRESS = "social-net/users/TOGGLE_FOLLOWING_PROGRESS";

// Action Creators
export const followUser = (user_ID: number) => ({type: FOLLOW_USER, user_ID} as const);
export const unfollowUser = (user_ID: number) => ({type: UNFOLLOW_USER, user_ID} as const);
export const setUsers = (users: UserType[]) => ({type: SET_USERS, users} as const);
export const setTotalUsersCount = (totalCount: number) => ({
  type: SET_TOTAL_USERS_COUNT, totalUsersCount: totalCount,
} as const);
export const setCurrentPage = (pageNumber: number) => ({
  type: SET_CURRENT_PAGE,
  currentPage: pageNumber
} as const);
export const toggleIsFetching = (isFetching: boolean) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching
} as const);
export const toggleFollowingProgress = (inProgress: boolean, user_ID: number) => ({
  type: TOGGLE_FOLLOWING_PROGRESS, inProgress, user_ID,
} as const);

// Utils
const followUnfollowFlow = async (
  dispatch: Dispatch<UsersActionsType>,
  actionCreator: (user_ID: number) => UsersActionsType,
  apiMethod: (user_ID: number) => Promise<APIResponseType>,
  user_ID: number
) => {
  dispatch(toggleFollowingProgress(true, user_ID));
  let data = await apiMethod(user_ID);
  if (data.resultCode === 0) dispatch(actionCreator(user_ID));
  dispatch(toggleFollowingProgress(false, user_ID));
};

// Thunk Creators
export const requestUsers = (page: number, pageSize: number): AppThunkType => async (dispatch) => {
  dispatch(toggleIsFetching(true));
  dispatch(setCurrentPage(page));
  let data = await usersAPI.getUsers(page, pageSize);
  dispatch(toggleIsFetching(false));
  dispatch(setUsers(data.items));
  dispatch(setTotalUsersCount(data.totalCount));
};
export const follow = (user_ID: number): AppThunkType => async (dispatch) => {
  await followUnfollowFlow(dispatch, followUser, followAPI.follow.bind(followAPI), user_ID);
};
export const unfollow = (user_ID: number): AppThunkType => async (dispatch) => {
  await followUnfollowFlow(dispatch, unfollowUser, followAPI.unfollow.bind(followAPI), user_ID);
};

export const usersReducer = (state: UsersInitStateType = initialState, action: UsersActionsType): UsersInitStateType => {
  switch (action.type) {
    case FOLLOW_USER:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.user_ID, "id", {followed: true}),
      };
    case UNFOLLOW_USER:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.user_ID, "id", {followed: false}),
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