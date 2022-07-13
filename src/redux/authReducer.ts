import {AppThunkType} from "./store";
import {stopSubmit} from "redux-form";
import {authAPI} from "../api/authApi";
import {securityAPI} from "../api/securityApi";
import {ResultCode, ResultCodeForCaptcha} from "../api/api";

// Types
export type AuthInitStateType = typeof initState;
export type AuthActionsType = ReturnType<typeof setAuthUserData> | ReturnType<typeof setCaptchaUrl>;

// Initial state
const initState = {
  user_ID: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null,
};

// Constants
const SET_AUTH_USER_DATA = "social-net/auth/SET_AUTH_USER_DATA";
const SET_CAPTCHA_URL = "social-net/auth/SET_CAPTCHA_URL";

// Action Creators
export const setAuthUserData = (user_ID: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
  type: SET_AUTH_USER_DATA, payload: {user_ID, email, login, isAuth}
} as const);
export const setCaptchaUrl = (captchaUrl: string) => ({
  type: SET_CAPTCHA_URL, payload: {captchaUrl}
} as const);

// Thunk Creators
export const getAuthUserData = (): AppThunkType => async (dispatch) => {
  let data = await authAPI.me();
  if (data.resultCode === ResultCode.Success) {
    const {id, email, login} = data.data;
    dispatch(setAuthUserData(id, email, login, true));
  }
};
export const login = (email: string, password: string, rememberMe: boolean, captcha: string): AppThunkType => {
  return async (dispatch) => {
    let data = await authAPI.login(email, password, rememberMe, captcha);
    if (data.resultCode === ResultCode.Success) {
      dispatch(getAuthUserData());
    } else {
      if (data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
        dispatch(getCaptchaUrl());
      }
      const message = data.messages.length > 0 ? data.messages[0] : "Some error";
      dispatch(stopSubmit("loginForm", {_error: message}));
    }
  };
};
export const logout = (): AppThunkType => async (dispatch) => {
  let data = await authAPI.logout();
  if (data.resultCode === ResultCode.Success) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};
export const getCaptchaUrl = (): AppThunkType => async (dispatch) => {
  let data = await securityAPI.getCaptchaUrl();
  dispatch(setCaptchaUrl(data.url));
};

export const authReducer = (state: AuthInitStateType = initState, action: AuthActionsType): AuthInitStateType => {
  switch (action.type) {
    case SET_AUTH_USER_DATA:
    case SET_CAPTCHA_URL:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
