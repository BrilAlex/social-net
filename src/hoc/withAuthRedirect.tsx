import React, {ComponentType} from "react";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../redux/reduxStore";
import {connect} from "react-redux";

type MapStateToPropsType = {
  isAuth: boolean
};

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    isAuth: state.auth.isAuth,
  }
};

export function withAuthRedirect<WCP>(Component: ComponentType<WCP>) {
  class AuthRedirectComponent extends React.Component<MapStateToPropsType> {
    render() {
      const {isAuth, ...restProps} = this.props;

      if (!isAuth) return <Redirect to={"/login"}/>;

      return <Component {...restProps as WCP}/>
    };
  }

  const ConnectedAuthRedirectComponent = connect(mapStateToProps)(AuthRedirectComponent);

  return ConnectedAuthRedirectComponent;
}