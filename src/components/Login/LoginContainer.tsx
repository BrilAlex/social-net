import React from "react";
import {Login} from "./Login";
import {connect} from "react-redux";
import {sendLoginData} from "../../redux/authReducer";

type MapStateToPropsType = {};
type MapDispatchToProps = {
  sendLoginData: (loginFormData: {email: string, password: string, rememberMe: boolean}) => void
};
type LoginContainerPropsType = MapStateToPropsType & MapDispatchToProps;

const mapStateToProps = () => ({});

class LoginContainer extends React.Component<LoginContainerPropsType> {
  render() {
    return (
      <Login {...this.props}/>
    );
  };
}

export default connect(mapStateToProps,{sendLoginData})(LoginContainer)