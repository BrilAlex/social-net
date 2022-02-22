import manAvatar from "./../assets/images/man_avatar.png";
import womanAvatar from "./../assets/images/woman_avatar.png";
import {rerenderEntireTree} from "../render";

export type PostType = {
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

export type ProfilePageType = {
  posts: Array<PostType>
  newPostText: string
};

export type DialogsPageType = {
  dialogs: Array<DialogType>
  messages: Array<MessageType>
  newMessageText: string
};

export type SidebarType = {
  friends: Array<FriendType>
};

export type RootStateType = {
  profilePage: ProfilePageType
  dialogsPage: DialogsPageType
  sidebar: SidebarType
};

export const state: RootStateType = {
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
};

export const updateNewPostText = (text: string) => {
  state.profilePage.newPostText = text;
  rerenderEntireTree(state);
};

export const addPost = () => {
  const posts = state.profilePage.posts;
  const newPostText = state.profilePage.newPostText;
  const newPost:PostType = {id: posts.length + 1, postText: newPostText, likesCount: 0};
  posts.push(newPost);
  rerenderEntireTree(state);
};

export const updateNewMessageText = (text: string) => {
  state.dialogsPage.newMessageText = text;
  rerenderEntireTree(state);
};

export const addMessage = () => {
  const messages = state.dialogsPage.messages;
  const newMessageText = state.dialogsPage.newMessageText;
  const newMessage: MessageType = {
    id: messages.length + 1,
    sender: "User",
    messageText: newMessageText,
    messageTime: "14.51"
  };
  messages.push(newMessage);
  rerenderEntireTree(state);
};