import React from "react";
import {Header} from "./Header";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/reduxStore";
import {getAuthUserData, logout} from "../../redux/authReducer";

type MapStateToPropsType = {
  login: string | null
  isAuth: boolean
};

type MapDispatchPropsType = {
  getAuthUserData: () => void
  logout: () => void
};

type HeaderContainerPropsType = MapStateToPropsType & MapDispatchPropsType;

class HeaderContainer extends React.Component<HeaderContainerPropsType> {
  componentDidMount() {
    this.props.getAuthUserData();
  };

  render() {
    return <Header {...this.props}/>;
  };
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
  login: state.auth.login,
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, {getAuthUserData, logout})(HeaderContainer);