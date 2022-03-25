import womanAvatar from "../assets/images/woman_avatar.png";
import manAvatar from "../assets/images/man_avatar.png";
import {ActionType} from "./reduxStore";

export type FriendType = {
  id: number
  name: string
  avatarSrc: string
};

export type SidebarInitStateType = typeof initialState;

const initialState = {
  friends: [
    {id: 1, name: "Karina", avatarSrc: womanAvatar},
    {id: 2, name: "Dimych", avatarSrc: manAvatar},
    {id: 3, name: "Sergei", avatarSrc: manAvatar},
    {id: 4, name: "Alexander", avatarSrc: manAvatar},
    {id: 5, name: "Svetlana", avatarSrc: womanAvatar},
  ] as Array<FriendType>,
};

export const sidebarReducer = (state = initialState, action: ActionType): SidebarInitStateType => {
  switch (action.type) {
    default:
      return state;
  }
};