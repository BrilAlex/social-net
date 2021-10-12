import {combineReducers, createStore} from "redux";
import profileReducer, {ProfileActionTypes} from "./profileReducer";
import dialogsReducer, {DialogsActionTypes} from "./dialogsReducer";
import sidebarReducer from "./sidebarReducer";

export type RootStateType = ReturnType<typeof rootReducer>;
export type ActionTypes = ProfileActionTypes | DialogsActionTypes;

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer
});

export let store = createStore(rootReducer);