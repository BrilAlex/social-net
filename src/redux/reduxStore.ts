import {combineReducers, createStore} from "redux";
import profileReducer, {ProfileActionTypes} from "./profileReducer";
import dialogsReducer, {DialogsActionTypes} from "./dialogsReducer";
import sidebarReducer from "./sidebarReducer";
import {usersReducer, UsersActionTypes} from "./usersReducer";
import {authReducer, AuthActionTypes} from "./authReducer";

export type RootStateType = ReturnType<typeof rootReducer>;
export type ActionTypes =
    ProfileActionTypes | DialogsActionTypes
    | UsersActionTypes | AuthActionTypes;

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
});

export let store = createStore(rootReducer);

//@ts-ignore
window.store = store;