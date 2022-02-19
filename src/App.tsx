import React from 'react';
import './App.css';
import {Header} from './components/Header/Header';
import {Navbar} from "./components/Navbar/Navbar";
import {Profile} from "./components/Profile/Profile";
import {Dialogs} from "./components/Dialogs/Dialogs";
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {Settings} from "./components/Settings/Settings";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {DialogType, MessageType, PostType} from "./index";

type AppPropsType = {
  posts: Array<PostType>
  dialogs: Array<DialogType>
  messages: Array<MessageType>
};

const App = (props: AppPropsType) => {
  return (
    <BrowserRouter>
      <div className="appWrapper">
        <Header/>
        <Navbar/>
        <div className={"appContentWrapper"}>
          <Routes>
            <Route path={"/profile"} element={<Profile posts={props.posts}/>}/>
            <Route path={"/dialogs/*"} element={<Dialogs dialogs={props.dialogs} messages={props.messages}/>}/>
            <Route path={"/news"} element={<News/>}/>
            <Route path={"/music"} element={<Music/>}/>
            <Route path={"/settings"} element={<Settings/>}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
