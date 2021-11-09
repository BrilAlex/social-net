import {ActionTypes, AppThunkType} from "./reduxStore";
import {authAPI} from "../api/api";

export type AuthStateType = typeof initialState;

export type AuthActionTypes = ReturnType<typeof setAuthUserData>;

let initialState = {
    userID: 1,
    email: "",
    login: "",
    isAuth: false,
}

const SET_AUTH_USER_DATA = "SET_AUTH_USER_DATA";

export const setAuthUserData = (userID: number, email: string, login: string) =>
    ({type: SET_AUTH_USER_DATA, userData: {userID, email, login}} as const);

export const getAuthUserData = (): AppThunkType => (dispatch) => {
    authAPI.getAuthData().then(data => {
        if (data.resultCode === 0) {
            let {id, email, login} = data.data;
            dispatch(setAuthUserData(id, email, login));
        }
    });
};

export const authReducer = (state: AuthStateType = initialState, action: ActionTypes): AuthStateType => {
    switch(action.type) {
        case SET_AUTH_USER_DATA:
            return {...state, ...action.userData, isAuth: true};
        default:
            return state;
    }
}