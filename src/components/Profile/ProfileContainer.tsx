import React from "react";
import {Profile} from "./Profile";
import {ProfileType, setUserProfile} from "../../redux/profileReducer";
import {AppStateType} from "../../redux/reduxStore";
import {connect} from "react-redux";
import axios from "axios";
import {RouteComponentProps, withRouter} from "react-router-dom";

type PathParamsType = {
  userID: string
}

type MapStateToPropsType = {
  profile: ProfileType
};

type MapDispatchToPropsType = {
  setUserProfile: (profile: ProfileType) => void
}

type ProfileAPIProsType = RouteComponentProps<PathParamsType> & MapStateToPropsType & MapDispatchToPropsType;

export type ProfileAPIResponseType = ProfileType;

class ProfileContainer extends React.Component<ProfileAPIProsType> {
  componentDidMount() {
    let user_ID = this.props.match.params.userID;
    if (!user_ID) {
      user_ID = "2";
    }

    axios.get<ProfileAPIResponseType>(`https://social-network.samuraijs.com/api/1.0/profile/${user_ID}`)
      .then(response => this.props.setUserProfile(response.data));
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