import {applyMiddleware, combineReducers, createStore} from "redux";
import {ProfileActionType, profileReducer} from "./profileReducer";
import {DialogsActionType, dialogsReducer} from "./dialogsReducer";
import {sidebarReducer} from "./sidebarReducer";
import {UsersActionType, usersReducer} from "./usersReducer";
import {AuthActionType, authReducer} from "./authReducer";
import thunkMiddleware from "redux-thunk";

export type AppStateType = ReturnType<typeof rootReducer>;

export type ActionType = ProfileActionType | DialogsActionType | UsersActionType | AuthActionType;

const rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

// @ts-ignore
window.store = store;