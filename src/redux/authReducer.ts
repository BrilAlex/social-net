import {ActionTypes} from "./reduxStore";

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

export const authReducer = (state: AuthStateType = initialState, action: ActionTypes): AuthStateType => {
    switch(action.type) {
        case SET_AUTH_USER_DATA:
            return {...state, ...action.userData, isAuth: true};
        default:
            return state;
    }
}