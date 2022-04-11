import React from "react";
import {Profile} from "./Profile";
import {ProfileType, setUserProfile} from "../../redux/profileReducer";
import {AppStateType} from "../../redux/reduxStore";
import {connect} from "react-redux";
import axios from "axios";

type MapStateToPropsType = {
  profile: ProfileType
};

type MapDispatchToPropsType = {
  setUserProfile: (profile: ProfileType) => void
}

type ProfileAPIProsType = MapStateToPropsType & MapDispatchToPropsType;

type ProfileAPIResponseType = ProfileType;

class ProfileContainer extends React.Component<ProfileAPIProsType> {
  componentDidMount() {
    axios.get<ProfileAPIResponseType>("https://social-network.samuraijs.com/api/1.0/profile/2").then(response => {
      this.props.setUserProfile(response.data);
    });
  };

  render() {
    return <Profile {...this.props}/>;
  };
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
  profile: state.profilePage.profile,
});

export default connect(mapStateToProps, {setUserProfile})(ProfileContainer);