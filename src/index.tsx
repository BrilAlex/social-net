import reportWebVitals from './reportWebVitals';
import {store} from "./redux/state";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";

let rerenderEntireTree = () => {
    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                <App
                    rootState={store.getState()}
                    addNewPostCallback={store.addNewPost.bind(store)}
                    updateNewPostTextCallback={store.updateNewPostText.bind(store)}
                    sendNewMessageCallback={store.sendNewMessage.bind(store)}
                    updateNewMessageTextCallback={store.updateNewMessageText.bind(store)}
                />
            </BrowserRouter>
        </React.StrictMode>,
        document.getElementById('root')
    );
};
rerenderEntireTree();
store.subscribe(rerenderEntireTree);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
