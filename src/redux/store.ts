import manAvatar from "./../assets/images/man_avatar.png";
import womanAvatar from "./../assets/images/woman_avatar.png";
import {profileReducer} from "./profileReducer";
import {dialogsReducer} from "./dialogsReducer";
import {sidebarReducer} from "./sidebarReducer";
import {ActionType} from "./reduxStore";

type PostType = {
  id: number
  postText: string
  likesCount: number
};

type DialogType = {
  id: number
  name: string
};

type MessageType = {
  id: number
  sender: string
  messageText: string
  messageTime: string
};

type FriendType = {
  id: number
  name: string
  avatarSrc: string
};

type ProfilePageType = {
  posts: Array<PostType>
  newPostText: string
};

type DialogsPageType = {
  dialogs: Array<DialogType>
  messages: Array<MessageType>
  newMessageText: string
};

type SidebarType = {
  friends: Array<FriendType>
};

type RootStateType = {
  profilePage: ProfilePageType
  dialogsPage: DialogsPageType
  sidebar: SidebarType
};

type RootStoreType = {
  _state: RootStateType
  _subscriber: (state: RootStateType) => void
  subscribe: (observer: (state: RootStateType) => void) => void
  getState: () => RootStateType
  dispatch: (action: ActionType) => void
};

const store: RootStoreType = {
  _state: {
    profilePage: {
      posts: [
        {id: 1, postText: "It's my first post", likesCount: 20},
        {id: 2, postText: "Hi! How are you?", likesCount: 10},
      ],
      newPostText: "",
    },
    dialogsPage: {
      dialogs: [
        {id: 1, name: "Karina"},
        {id: 2, name: "Dimych"},
        {id: 3, name: "Sergei"},
        {id: 4, name: "Alexander"},
        {id: 5, name: "Svetlana"},
      ],
      messages: [
        {
          id: 1,
          sender: "Me",
          messageText: "Hi!",
          messageTime: "12:05",
        },
        {
          id: 2,
          sender: "User",
          messageText: "Yo! How are you?",
          messageTime: "12:18",
        },
        {
          id: 3,
          sender: "Me",
          messageText: "Fine, studying in IT-Incubator now. And you?",
          messageTime: "12:24",
        },
      ],
      newMessageText: "",
    },
    sidebar: {
      friends: [
        {id: 1, name: "Karina", avatarSrc: womanAvatar},
        {id: 2, name: "Dimych", avatarSrc: manAvatar},
        {id: 3, name: "Sergei", avatarSrc: manAvatar},
        {id: 4, name: "Alexander", avatarSrc: manAvatar},
        {id: 5, name: "Svetlana", avatarSrc: womanAvatar},
      ],
    }
  },
  _subscriber() {
    console.log("No subscribers (observers)");
  },
  subscribe(observer) {
    this._subscriber = observer;
  },
  getState() {
    return this._state;
  },
  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
    this._state.sidebar = sidebarReducer(this._state.sidebar, action);
    this._subscriber(this._state);
  },
};

// @ts-ignore
window.store = store;