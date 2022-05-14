import {AppThunkType} from "./reduxStore";
import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

// Types
export type AuthInitStateType = typeof initState;
export type AuthActionsType = ReturnType<typeof setAuthUserData>;

// Initial state
const initState = {
  user_ID: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
};

// Constants
const SET_AUTH_USER_DATA = "SET_AUTH_USER_DATA";

// Action Creators
export const setAuthUserData = (user_ID: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
  type: SET_AUTH_USER_DATA, payload: {user_ID, email, login, isAuth}
} as const);

// Thunk Creators
export const getAuthUserData = (): AppThunkType => (dispatch) => {
  return authAPI.me().then(data => {
    if (data.resultCode === 0) {
      const {id, email, login} = data.data;
      dispatch(setAuthUserData(id, email, login, true));
    }
  });
};
export const login = (email: string, password: string, rememberMe: boolean): AppThunkType => {
  return (dispatch) => {
    authAPI.login(email, password, rememberMe).then(data => {
      if (data.resultCode === 0) {
        dispatch(getAuthUserData());
      } else {
        const message = data.messages.length > 0 ? data.messages[0] : "Some error";
        dispatch(stopSubmit("loginForm", {_error: message}));
      }
    });
  };
};
export const logout = (): AppThunkType => (dispatch) => {
  authAPI.logout().then(data => {
    if (data.resultCode === 0) {
      dispatch(setAuthUserData(0, "", "", false));
    }
  });
}

export const authReducer = (state: AuthInitStateType = initState, action: AuthActionsType): AuthInitStateType => {
  switch (action.type) {
    case SET_AUTH_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};