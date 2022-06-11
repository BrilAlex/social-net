import React, {ComponentType} from 'react';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import {SidebarContainer} from "./components/Sidebar/SidebarContainer";
import {DialogsContainer} from "./components/Dialogs/DialogsContainer";
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {Settings} from "./components/Settings/Settings";
import {BrowserRouter, Route, withRouter} from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import Login from "./components/Login/Login";
import {compose} from "redux";
import {connect, Provider} from "react-redux";
import {initializeApp} from "./redux/appReducer";
import {AppStateType, store} from "./redux/reduxStore";
import {Preloader} from "./components/common/Preloader/Preloader";


type MapStateToPropsType = {
  initialized: boolean
};
type MapDispatchToPropsType = {
  initializeApp: () => void
}
type AppPropsType = MapStateToPropsType & MapDispatchToPropsType;

class App extends React.Component<AppPropsType> {
  componentDidMount() {
    this.props.initializeApp();
  };

  render() {
    if (!this.props.initialized) {
      return <Preloader/>;
    }

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
          <Route path={"/login"} render={() => <Login/>}/>
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,
});

const AppContainer = compose<ComponentType>(
  withRouter,
  connect(mapStateToProps, {initializeApp})
)(App);

const SocialNetApp = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer/>
      </Provider>
    </BrowserRouter>
  );
};

export default SocialNetApp;
