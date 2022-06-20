import React, {ComponentType, lazy} from 'react';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import {SidebarContainer} from "./components/Sidebar/SidebarContainer";
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {Settings} from "./components/Settings/Settings";
import {HashRouter, Redirect, Route, Switch, withRouter} from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import Login from "./components/Login/Login";
import {compose} from "redux";
import {connect, Provider} from "react-redux";
import {initializeApp, setAppError} from "./redux/appReducer";
import {AppStateType, store} from "./redux/reduxStore";
import {Preloader} from "./components/common/Preloader/Preloader";
import {withSuspense} from "./hoc/withSuspense";
import {SnackBar} from "./components/common/SnackBar/SnackBar";

const ProfileContainer = lazy(() => import ("./components/Profile/ProfileContainer"));
const DialogsContainer = lazy(() => import ("./components/Dialogs/DialogsContainer"));

const SuspendedProfile = withSuspense(ProfileContainer);
const SuspendedDialogs = withSuspense(DialogsContainer);

type MapStateToPropsType = {
  initialized: boolean
  error: string | null
};
type MapDispatchToPropsType = {
  initializeApp: () => void
  catchAllUnhandledAppErrors: () => void
  setAppError: (error: string | null) => void
}
type AppPropsType = MapStateToPropsType & MapDispatchToPropsType;

class App extends React.Component<AppPropsType> {
  catchAllUnhandledAppErrors = (e: PromiseRejectionEvent) => {
    console.log(e);
    const errorMessage = e.reason.message + ": " + e.reason.response.statusText;
    this.props.setAppError(errorMessage);
  };

  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener("unhandledrejection", this.catchAllUnhandledAppErrors)
  };

  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.catchAllUnhandledAppErrors);
  };

  render() {
    if (!this.props.initialized) {
      return <Preloader/>;
    }

    return (
      <div className={"appWrapper"}>
        <HeaderContainer/>
        <SidebarContainer/>
        <div className={"appContentWrapper"}>
          <Switch>
            <Route exact path={"/"} render={() => <Redirect to={"/profile"}/>}/>
            <Route path={"/profile/:userID?"} render={() => <SuspendedProfile/>}/>
            <Route path={"/dialogs"} render={() => <SuspendedDialogs/>}/>
            <Route path={"/news"} render={() => <News/>}/>
            <Route path={"/music"} render={() => <Music/>}/>
            <Route path={"/users"} render={() => <UsersContainer/>}/>
            <Route path={"/settings"} render={() => <Settings/>}/>
            <Route path={"/login"} render={() => <Login/>}/>
            <Route path={"*"} render={() => <div>Error 404: Page not found</div>}/>
          </Switch>
        </div>
        {this.props.error && <SnackBar error={this.props.error}/>}
      </div>
    );
  };
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,
  error: state.app.error,
});

const AppContainer = compose<ComponentType>(
  withRouter,
  connect(mapStateToProps, {initializeApp, setAppError})
)(App);

const SocialNetApp = () => {
  return (
    <HashRouter>
      <Provider store={store}>
        <AppContainer/>
      </Provider>
    </HashRouter>
  );
};

export default SocialNetApp;
