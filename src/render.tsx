import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
  addMessage,
  addPost,
  RootStateType,
  updateNewMessageText,
  updateNewPostText
} from "./redux/state";

export const rerenderEntireTree = (state: RootStateType) => {
  ReactDOM.render(
    <React.StrictMode>
      <App
        state={state}
        updateNewPostText={updateNewPostText}
        addPost={addPost}
        updateNewMessageText={updateNewMessageText}
        addMessage={addMessage}
      />
    </React.StrictMode>,
    document.getElementById('root')
  );
};