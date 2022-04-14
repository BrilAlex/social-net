import React from 'react';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import {SidebarContainer} from "./components/Sidebar/SidebarContainer";
import {DialogsContainer} from "./components/Dialogs/DialogsContainer";
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {Settings} from "./components/Settings/Settings";
import {Route} from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";


const App = () => {
  return (
    <div className="appWrapper">
      <HeaderContainer/>
      <SidebarContainer/>
      <div className={"appContentWrapper"}>
        <Route path={"/profile/:userID?"} render={() => <ProfileContainer/>}/>
        <Route path={"/dialogs"} render={() => <DialogsContainer/>}/>
        <Route path={"/news"} render={() => <News/>}/>
        <Route path={"/music"} render={() => <Music/>}/>
        <Route path={"/users"} render={() => <UsersContainer/>}/>
        <Route path={"/settings"} render={() => <Settings/>}/>
      </div>
    </div>
  );
}

export default App;
