import {ActionTypes} from "./reduxStore";

export type FriendType = {
    id: number
    name: string
    avatar: string
    avatarAlt: string
};

export type SidebarType = {
    friendsList: Array<FriendType>
};

let initialSate: SidebarType = {
    friendsList: [
        {id: 1, name: "Dimych", avatar: "avatar", avatarAlt: "avatar Alt"},
        {id: 2, name: "Igor", avatar: "avatar", avatarAlt: "avatar Alt"},
        {id: 3, name: "Sveta", avatar: "avatar", avatarAlt: "avatar Alt"},
        {id: 4, name: "Sasha", avatar: "avatar", avatarAlt: "avatar Alt"},
        {id: 5, name: "Viktor", avatar: "avatar", avatarAlt: "avatar Alt"},
        {id: 6, name: "Valera", avatar: "avatar", avatarAlt: "avatar Alt"},
        {id: 7, name: "Alex", avatar: "avatar", avatarAlt: "avatar Alt"}
    ]
};

const sidebarReducer = (state = initialSate, action: ActionTypes) => {
    return state;
}

export default sidebarReducer;