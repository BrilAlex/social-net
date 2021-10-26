import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header"
import {Profile} from "./components/Profile/Profile";
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {Settings} from "./components/Settings/Settings";
import {Route} from "react-router-dom";
import {DialogsContainer} from "./components/Dialogs/DialogsContainer";
import {SidebarContainer} from "./components/Sidebar/SidebarContainer";
import UsersContainer from "./components/Users/UsersContainer";

const App = () => {
    return (
        <div className="appContainer">
            <Header/>
            <SidebarContainer/>
            <div className={"appContent"}>
                <Route render={() => <Profile/>} path={"/profile"}/>
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
