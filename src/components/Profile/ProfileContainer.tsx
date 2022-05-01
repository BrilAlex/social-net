import React from "react";
import {Profile} from "./Profile";
import {getUserProfile, ProfileType} from "../../redux/profileReducer";
import {AppStateType} from "../../redux/reduxStore";
import {connect} from "react-redux";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

type PathParamsType = {
  userID: string
};

type MapStateToPropsType = {
  profile: ProfileType
};

type MapDispatchToPropsType = {
  getUserProfile: (user_ID: string) => void
};

type ProfileContainerPropsType =
  RouteComponentProps<PathParamsType>
  & MapStateToPropsType
  & MapDispatchToPropsType;

class ProfileContainer extends React.Component<ProfileContainerPropsType> {
  componentDidMount() {
    let user_ID = this.props.match.params.userID;
    if (!user_ID) {
      user_ID = "2";
    }
    this.props.getUserProfile(user_ID);
  };

  render() {
    return <Profile {...this.props}/>;
  };
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
  profile: state.profilePage.profile,
});

const ProfileContainerWithUrlData = withRouter(ProfileContainer);

export default withAuthRedirect(connect(mapStateToProps, {
  getUserProfile
})(ProfileContainerWithUrlData));