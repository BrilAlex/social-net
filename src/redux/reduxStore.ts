import {combineReducers, createStore} from "redux";
import profileReducer, {ProfileActionTypes} from "./profileReducer";
import dialogsReducer, {DialogsActionTypes} from "./dialogsReducer";
import sidebarReducer from "./sidebarReducer";
import {ProfilePageType} from "./profileReducer";
import {DialogsPageType} from "./dialogsReducer";
import {SidebarType} from "./sidebarReducer";

export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    sidebar: SidebarType
};

export type ActionTypes = ProfileActionTypes | DialogsActionTypes;

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer
});

export let store = createStore(reducers);