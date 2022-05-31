// Types
import {AppThunkType} from "./reduxStore";
import {getAuthUserData} from "./authReducer";

export type InitStateType = typeof initState;
export type AppActionsType = ReturnType<typeof setInitializedSuccessfully>;

// Initial state
const initState = {
  initialized: false,
};

// Constants
const SET_INITIALIZED_SUCCESSFULLY = "SET-INITIALIZED-SUCCESSFULLY";

// Action Creators
export const setInitializedSuccessfully = () => ({type: SET_INITIALIZED_SUCCESSFULLY} as const);

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
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};
