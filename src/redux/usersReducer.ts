import {ActionType} from "./reduxStore";

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
  ReturnType<typeof followUserAC>
  | ReturnType<typeof unfollowUserAC>
  | ReturnType<typeof setUsersAC>;

const initialState = {
  users: [] as UserType[],
};

const FOLLOW_USER = "FOLLOW-USER";
const UNFOLLOW_USER = "UNFOLLOW-USER";
const SET_USERS = "SET-USERS";

export const followUserAC = (user_ID: number) => ({type: FOLLOW_USER, user_ID} as const);

export const unfollowUserAC = (user_ID: number) => ({type: UNFOLLOW_USER, user_ID} as const);

export const setUsersAC = (users: UserType[]) => ({type: SET_USERS, users} as const);

export const usersReducer = (state = initialState, action: ActionType): UsersInitStateType => {
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
        users: [...state.users, ...action.users],
      };
    default:
      return state;
  }
};