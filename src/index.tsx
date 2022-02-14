import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

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

export type ProfileType = {
  posts: Array<PostType>
}

export type DialogsType = {
  dialogs: Array<DialogType>
  messages: Array<MessageType>
}

export type AppStateType = {
  profile: ProfileType
  dialogs: DialogsType
};

export const state: AppStateType = {
  profile: {
    posts: [
      {id: 1, postText: "It's my first post", likesCount: 10},
      {id: 2, postText: "It's my first post", likesCount: 10},
    ],
  },
  dialogs: {
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
        messageTime: "12:05"
      },
      {
        id: 2,
        sender: "User",
        messageText: "Yo! How are you?",
        messageTime: "12:18"
      },
      {
        id: 3,
        sender: "Me",
        messageText: "Fine, studying in IT-Incubator now. And you?",
        messageTime: "12:24"
      },
    ],
  },
};

ReactDOM.render(
  <React.StrictMode>
    <App state={state}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
