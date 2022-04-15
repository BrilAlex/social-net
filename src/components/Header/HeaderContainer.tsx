import React from "react";
import {Header} from "./Header";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/reduxStore";
import {setAuthUserData, setAuthUserProfile} from "../../redux/authReducer";
import {ProfileType} from "../../redux/profileReducer";
import {authAPI, profileAPI} from "../../api/api";

type MapStateToPropsType = {
  login: string
  isAuth: boolean
  profile: ProfileType
};

type MapDispatchPropsType = {
  setAuthUserData: (id: number, email: string, login: string) => void
  setAuthUserProfile: (profile: ProfileType) => void
};

type HeaderContainerPropsType = MapStateToPropsType & MapDispatchPropsType;

class HeaderContainer extends React.Component<HeaderContainerPropsType> {
  componentDidMount() {
    authAPI.getAuthUser().then(data => {
      if (data.resultCode === 0) {
        const {id, email, login} = data.data;
        this.props.setAuthUserData(id, email, login);
        return profileAPI.getUserProfile(id.toString());
      }
    }).then(data => data && this.props.setAuthUserProfile(data));
  };

  render() {
    return <Header {...this.props}/>;
  };
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
  login: state.auth.login,
  isAuth: state.auth.isAuth,
  profile: state.auth.profile,
});

export default connect(mapStateToProps, {setAuthUserData, setAuthUserProfile})(HeaderContainer);