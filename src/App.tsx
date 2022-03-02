import React from 'react';
import './App.css';
import {Header} from './components/Header/Header';
import {Sidebar} from "./components/Sidebar/Sidebar";
import {Profile} from "./components/Profile/Profile";
import {Dialogs} from "./components/Dialogs/Dialogs";
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {Settings} from "./components/Settings/Settings";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {RootStateType} from "./redux/store";

type AppPropsType = {
  state: RootStateType
  updateNewPostText: (text: string) => void
  addPost: () => void
  updateNewMessageText: (text: string) => void
  addMessage: () => void
};

const App: React.FC<AppPropsType> = (props) => {
  return (
    <BrowserRouter>
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
                  updateNewPostText={props.updateNewPostText}
                  addPost={props.addPost}
                />
              }
            />
            <Route
              path={"/dialogs/*"}
              element={
                <Dialogs
                  dialogsPage={props.state.dialogsPage}
                  updateNewMessageText={props.updateNewMessageText}
                  addMessage={props.addMessage}
                />
              }
            />
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
