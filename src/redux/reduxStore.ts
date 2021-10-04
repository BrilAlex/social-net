import {combineReducers, createStore} from "redux";
import profileReducer, {ProfileActionTypes} from "./profileReducer";
import dialogsReducer, {DialogsActionTypes} from "./dialogsReducer";
import sidebarReducer from "./sidebarReducer";

export type RootStoreType = typeof store;

export type ActionTypes = ProfileActionTypes | DialogsActionTypes;

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer
});

export let store = createStore(reducers);