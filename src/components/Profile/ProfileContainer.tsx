import React, {ComponentType} from "react";
import {Profile} from "./Profile";
import {
  getUserProfile,
  getUserStatus,
  saveAvatar, saveProfile,
  updateUserStatus
} from "../../redux/profileReducer";
import {AppStateType} from "../../redux/store";
import {connect} from "react-redux";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";
import {ProfileType} from "../../api/profileApi";

type PathParamsType = {
  userID: string
};

type MapStateToPropsType = {
  profile: ProfileType | null
  status: string
  authorizedUser_ID: number | null
  isAuth: boolean
};

type MapDispatchToPropsType = {
  getUserProfile: (user_ID: number) => void
  getUserStatus: (user_ID: number) => void
  updateUserStatus: (newStatus: string) => void
  saveAvatar: (file: File) => void
  saveProfile: (profile: ProfileType) => Promise<{}>;
};

type ProfileContainerPropsType =
  RouteComponentProps<PathParamsType>
  & MapStateToPropsType
  & MapDispatchToPropsType;

class ProfileContainer extends React.Component<ProfileContainerPropsType> {
  refreshProfile() {
    let user_ID: number | null = Number(this.props.match.params.userID);
    if (!user_ID) {
      user_ID = this.props.authorizedUser_ID;
      if (!user_ID) {
        this.props.history.push("/login");
      }
    }

    if (user_ID) {
      this.props.getUserProfile(user_ID);
      this.props.getUserStatus(user_ID);
    }
  };

  componentDidMount() {
    this.refreshProfile();
  };

  componentDidUpdate(prevProps: ProfileContainerPropsType) {
    if (this.props.match.params.userID !== prevProps.match.params.userID) {
      this.refreshProfile();
    }
  };

  render() {
    const {profile, status, updateUserStatus, saveAvatar, saveProfile} = this.props;
    return (
      <Profile
        isOwner={!this.props.match.params.userID}
        profile={profile}
        status={status}
        updateStatus={updateUserStatus}
        saveAvatar={saveAvatar}
        saveProfile={saveProfile}
      />
    );
  };
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUser_ID: state.auth.user_ID,
  isAuth: state.auth.isAuth,
});

export default compose<ComponentType>(
  connect(
    mapStateToProps,
    {getUserProfile, getUserStatus, updateUserStatus, saveAvatar, saveProfile}
  ),
  withRouter,
)(ProfileContainer);
