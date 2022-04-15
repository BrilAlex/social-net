import React from "react";
import {Profile} from "./Profile";
import {ProfileType, setUserProfile} from "../../redux/profileReducer";
import {AppStateType} from "../../redux/reduxStore";
import {connect} from "react-redux";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {profileAPI} from "../../api/api";

type PathParamsType = {
  userID: string
}

type MapStateToPropsType = {
  profile: ProfileType
};

type MapDispatchToPropsType = {
  setUserProfile: (profile: ProfileType) => void
}

type ProfileContainerProsType = RouteComponentProps<PathParamsType> & MapStateToPropsType & MapDispatchToPropsType;

class ProfileContainer extends React.Component<ProfileContainerProsType> {
  componentDidMount() {
    let user_ID = this.props.match.params.userID;
    if (!user_ID) {
      user_ID = "2";
    }

    profileAPI.getUserProfile(user_ID).then(data => this.props.setUserProfile(data));
  };

  render() {
    return <Profile {...this.props}/>;
  };
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
  profile: state.profilePage.profile,
});

const ProfileContainerWithUrlData = withRouter(ProfileContainer);

export default connect(mapStateToProps, {setUserProfile})(ProfileContainerWithUrlData);