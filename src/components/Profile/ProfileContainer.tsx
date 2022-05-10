import React, {ComponentType} from "react";
import {Profile} from "./Profile";
import {
  getUserProfile,
  getUserStatus,
  ProfileType,
  updateUserStatus
} from "../../redux/profileReducer";
import {AppStateType} from "../../redux/reduxStore";
import {connect} from "react-redux";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";

type PathParamsType = {
  userID: string
};

type MapStateToPropsType = {
  profile: ProfileType
  status: string
  authorizedUser_ID: number
  isAuth: boolean
};

type MapDispatchToPropsType = {
  getUserProfile: (user_ID: string) => void
  getUserStatus: (user_ID: string) => void
  updateUserStatus: (newStatus: string) => void
};

type ProfileContainerPropsType =
  RouteComponentProps<PathParamsType>
  & MapStateToPropsType
  & MapDispatchToPropsType;

class ProfileContainer extends React.Component<ProfileContainerPropsType> {
  componentDidMount() {
    let user_ID = this.props.match.params.userID;
    if (!user_ID) {
      user_ID = this.props.authorizedUser_ID.toString();
    }
    this.props.getUserProfile(user_ID);
    this.props.getUserStatus(user_ID);
  };

  render() {
    const {profile, status, updateUserStatus} = this.props;
    return <Profile profile={profile} status={status} updateStatus={updateUserStatus}/>;
  };
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUser_ID: state.auth.user_ID,
  isAuth: state.auth.isAuth,
});

export default compose<ComponentType>(
  connect(mapStateToProps, {getUserProfile, getUserStatus, updateUserStatus}),
  withRouter,
)(ProfileContainer);