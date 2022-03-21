import React from 'react';
import './App.css';
import {Header} from './components/Header/Header';
import {SidebarContainer} from "./components/Sidebar/SidebarContainer";
import {Profile} from "./components/Profile/Profile";
import {DialogsContainer} from "./components/Dialogs/DialogsContainer";
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {Settings} from "./components/Settings/Settings";
import {Routes, Route} from "react-router-dom";

const App = () => {
  return (
    <div className="appWrapper">
      <Header/>
      <SidebarContainer/>
      <div className={"appContentWrapper"}>
        <Routes>
          <Route path={"/profile"} element={<Profile/>}/>
          <Route path={"/dialogs/*"} element={<DialogsContainer/>}/>
          <Route path={"/news"} element={<News/>}/>
          <Route path={"/music"} element={<Music/>}/>
          <Route path={"/settings"} element={<Settings/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
