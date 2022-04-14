import {ActionType} from "./reduxStore";
import {ProfileType} from "./profileReducer";

export type AuthInitStateType = typeof initState;

export type AuthActionType = ReturnType<typeof setAuthUserData> | ReturnType<typeof setAuthUserProfile>;

const initState = {
  user_ID: 0,
  email: "",
  login: "",
  isAuth: false,
  profile: {} as ProfileType,
};

const SET_AUTH_USER_DATA = "SET_AUTH_USER_DATA";
const SET_AUTH_USER_PROFILE = "SET_AUTH_USER_PROFILE";

export const setAuthUserData = (user_ID: number, email: string, login: string) => ({
  type: SET_AUTH_USER_DATA, userData: {user_ID, email, login}
} as const);

export const setAuthUserProfile = (profile: ProfileType) => ({
  type: SET_AUTH_USER_PROFILE, userProfile: profile
} as const);

export const authReducer = (state: AuthInitStateType = initState, action: ActionType): AuthInitStateType => {
  switch (action.type) {
    case SET_AUTH_USER_DATA:
      return {
        ...state,
        ...action.userData,
        isAuth: true,
      };
    case SET_AUTH_USER_PROFILE:
      return {
        ...state,
        profile: action.userProfile,
      };
    default:
      return state;
  }
};