import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header"
import {Profile} from "./components/Profile/Profile";
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {Settings} from "./components/Settings/Settings";
import {Route} from "react-router-dom";
import {RootStoreType} from "./redux/reduxStore";
import {DialogsContainer} from "./components/Dialogs/DialogsContainer";
import {SidebarContainer} from "./components/Sidebar/SidebarContainer";

type AppProps = {
    store: RootStoreType
};

const App: React.FC<AppProps> = (props) => {
    return (
        <div className="appContainer">
            <Header/>
            <SidebarContainer store={props.store}/>
            <div className={"appContent"}>
                <Route render={() => <Profile store={props.store}/>} path={"/profile"}/>
                <Route render={() => <DialogsContainer store={props.store}/>} path={"/dialogs"}/>
                <Route render={() => <News/>} path={"/news"}/>
                <Route render={() => <Music/>} path={"/music"}/>
                <Route render={() => <Settings/>} path={"/settings"}/>
            </div>
        </div>
    );
};

export default App;
