import React from 'react';
import './App.css';
import HeaderContainer from "./components/Header/HeaderContainer"
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {Settings} from "./components/Settings/Settings";
import {Route} from "react-router-dom";
import {DialogsContainer} from "./components/Dialogs/DialogsContainer";
import {SidebarContainer} from "./components/Sidebar/SidebarContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";

const App = () => {
    return (
        <div className="appContainer">
            <HeaderContainer/>
            <SidebarContainer/>
            <div className={"appContent"}>
                <Route render={() => <ProfileContainer/>} path={"/profile/:userID?"}/>
                <Route render={() => <DialogsContainer/>} path={"/dialogs"}/>
                <Route render={() => <News/>} path={"/news"}/>
                <Route render={() => <Music/>} path={"/music"}/>
                <Route render={() => <UsersContainer/>} path={"/users"}/>
                <Route render={() => <Settings/>} path={"/settings"}/>
            </div>
        </div>
    );
};

export default App;
