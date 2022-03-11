import React from 'react';
import './App.css';
import {Header} from './components/Header/Header';
import {Sidebar} from "./components/Sidebar/Sidebar";
import {Profile} from "./components/Profile/Profile";
import {Dialogs} from "./components/Dialogs/Dialogs";
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {Settings} from "./components/Settings/Settings";
import {Routes, Route} from "react-router-dom";
import {ActionType, RootStateType} from "./redux/store";

type AppPropsType = {
  state: RootStateType
  dispatch: (action: ActionType) => void
};

const App: React.FC<AppPropsType> = (props) => {
  return (
    <div className="appWrapper">
      <Header/>
      <Sidebar state={props.state.sidebar}/>
      <div className={"appContentWrapper"}>
        <Routes>
          <Route
            path={"/profile"}
            element={
              <Profile
                profilePage={props.state.profilePage}
                dispatch={props.dispatch}
              />
            }
          />
          <Route
            path={"/dialogs/*"}
            element={
              <Dialogs
                dialogsPage={props.state.dialogsPage}
                dispatch={props.dispatch}
              />
            }
          />
          <Route path={"/news"} element={<News/>}/>
          <Route path={"/music"} element={<Music/>}/>
          <Route path={"/settings"} element={<Settings/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
