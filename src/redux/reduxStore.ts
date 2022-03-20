import {combineReducers, createStore} from "redux";
import {ProfileActionType, ProfilePageType, profileReducer} from "./profileReducer";
import {DialogsActionType, DialogsPageType, dialogsReducer} from "./dialogsReducer";
import {sidebarReducer, SidebarType} from "./sidebarReducer";

export type AppStateType = {
  profilePage: ProfilePageType
  dialogsPage: DialogsPageType
  sidebar: SidebarType
};

export type ActionType = ProfileActionType | DialogsActionType;

const rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
});

export const store = createStore(rootReducer);

// @ts-ignore
window.store = store;