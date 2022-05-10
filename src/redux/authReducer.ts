import {AppActionType, AppThunkType} from "./reduxStore";
import {setUserProfile} from "./profileReducer";
import {authAPI, profileAPI} from "../api/api";

export type AuthInitStateType = typeof initState;

export type AuthActionType = ReturnType<typeof setAuthUserData>;

const initState = {
  user_ID: 0,
  email: "",
  login: "",
  isAuth: false,
};

const SET_AUTH_USER_DATA = "SET_AUTH_USER_DATA";

// actionCreators
export const setAuthUserData = (user_ID: number, email: string, login: string, isAuth: boolean) => ({
  type: SET_AUTH_USER_DATA, payload: {user_ID, email, login, isAuth}
} as const);

// thunkCreators
export const getAuthUserData = (): AppThunkType => (dispatch) => {
  authAPI.me().then(data => {
    if (data.resultCode === 0) {
      const {id, email, login} = data.data;
      dispatch(setAuthUserData(id, email, login, true));
      return profileAPI.getUserProfile(id.toString());
    }
  }).then(data => data && dispatch(setUserProfile(data)));
};

export const login = (email: string, password: string, rememberMe: boolean): AppThunkType => {
  return (dispatch) => {
    authAPI.login(email, password, rememberMe).then(data => {
      if (data.resultCode === 0) {
        dispatch(getAuthUserData());
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

export const authReducer = (state: AuthInitStateType = initState, action: AppActionType): AuthInitStateType => {
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