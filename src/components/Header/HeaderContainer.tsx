import React from "react";
import {Header} from "./Header";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/reduxStore";
import {setAuthUserData, setAuthUserProfile} from "../../redux/authReducer";
import axios from "axios";
import {ProfileType} from "../../redux/profileReducer";
import {ProfileAPIResponseType} from "../Profile/ProfileContainer";

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

type AuthAPIResponseType = {
  data: {
    id: number
    email: string
    login: string
  }
  resultCode: number
  messages: Array<string>
};

class HeaderContainer extends React.Component<HeaderContainerPropsType>{
  componentDidMount() {
    axios.get<AuthAPIResponseType>(
      "https://social-network.samuraijs.com/api/1.0/auth/me",
      {withCredentials: true}
    ).then(response => {
      if (response.data.resultCode === 0) {
        const {id, email, login} = response.data.data;
        this.props.setAuthUserData(id, email, login);
        return axios.get<ProfileAPIResponseType>("https://social-network.samuraijs.com/api/1.0/profile/" + id);
      }
    }).then(response => response && this.props.setAuthUserProfile(response.data));
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