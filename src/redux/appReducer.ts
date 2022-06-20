import {AppThunkType} from "./reduxStore";
import {getAuthUserData} from "./authReducer";

// Types
export type InitStateType = typeof initState;
export type AppActionsType =
  | ReturnType<typeof setInitializedSuccessfully>
  | ReturnType<typeof setAppError>;

// Initial state
const initState = {
  initialized: false,
  error: null as string | null,
};

// Constants
const SET_INITIALIZED_SUCCESSFULLY = "social-net/app/SET-INITIALIZED-SUCCESSFULLY";
const SET_APP_ERROR = "social-net/app/SET-APP-ERROR";

// Action Creators
export const setInitializedSuccessfully = () =>
  ({type: SET_INITIALIZED_SUCCESSFULLY} as const);
export const setAppError = (error: string | null) =>
  ({type: SET_APP_ERROR, error} as const);

// Thunk Creators
export const initializeApp = (): AppThunkType => (dispatch) => {
  let promise = dispatch(getAuthUserData());
  Promise.all([promise]).then(() => {
    dispatch(setInitializedSuccessfully());
  });
};

export const appReducer = (state: InitStateType = initState, action: AppActionsType): InitStateType => {
  switch (action.type) {
    case SET_INITIALIZED_SUCCESSFULLY:
      return {...state, initialized: true};
    case SET_APP_ERROR:
      return {...state, error: action.error};
    default:
      return state;
  }
};
