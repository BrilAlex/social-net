import {AppActionType, AppThunkType} from "./reduxStore";
import {ProfileType} from "./profileReducer";
import {authAPI, profileAPI} from "../api/api";

export type AuthInitStateType = typeof initState;

export type AuthActionType =
  ReturnType<typeof setAuthUserData>
  | ReturnType<typeof setAuthUserProfile>;

const initState = {
  user_ID: 0,
  email: "",
  login: "",
  isAuth: false,
  profile: {} as ProfileType,
};

const SET_AUTH_USER_DATA = "SET_AUTH_USER_DATA";
const SET_AUTH_USER_PROFILE = "SET_AUTH_USER_PROFILE";

// actionCreators
export const setAuthUserData = (user_ID: number, email: string, login: string) => ({
  type: SET_AUTH_USER_DATA, userData: {user_ID, email, login}
} as const);
export const setAuthUserProfile = (profile: ProfileType) => ({
  type: SET_AUTH_USER_PROFILE, userProfile: profile
} as const);

// thunkCreators
export const getAuthUserData = (): AppThunkType => (dispatch) => {
  authAPI.getAuthUser().then(data => {
    if (data.resultCode === 0) {
      const {id, email, login} = data.data;
      dispatch(setAuthUserData(id, email, login));
      return profileAPI.getUserProfile(id.toString());
    }
  }).then(data => data && dispatch(setAuthUserProfile(data)));
};

export const sendLoginData = (loginFormData: { email: string, password: string, rememberMe: boolean }): AppThunkType => {
  return (dispatch) => {
    authAPI.login(loginFormData).then(data => {
      if (data.resultCode === 0) {
        return profileAPI.getUserProfile(data.data.userId.toString());
      }
    }).then(data => data && dispatch(setAuthUserProfile(data)));
  };
};

export const authReducer = (state: AuthInitStateType = initState, action: AppActionType): AuthInitStateType => {
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