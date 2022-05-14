import {applyMiddleware, combineReducers, createStore} from "redux";
import {ProfileActionsType, profileReducer} from "./profileReducer";
import {DialogsActionsType, dialogsReducer} from "./dialogsReducer";
import {sidebarReducer} from "./sidebarReducer";
import {UsersActionsType, usersReducer} from "./usersReducer";
import {AuthActionsType, authReducer} from "./authReducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import {FormAction, reducer as formReducer} from "redux-form";

export type AppStateType = ReturnType<typeof rootReducer>;

export type AppActionsType =
  ProfileActionsType
  | DialogsActionsType
  | UsersActionsType
  | AuthActionsType;
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AppActionsType | FormAction>;

const rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

// @ts-ignore
window.store = store;