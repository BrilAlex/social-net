import React from 'react';
import {Profile} from "./Profile";
import {ProfileType, setUserProfile} from "../../redux/profileReducer";
import {connect} from "react-redux";
import {RootStateType} from "../../redux/reduxStore";
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
};
type ProfileAPIPropsType = RouteComponentProps<PathParamsType> &
    MapStateToPropsType & MapDispatchToPropsType;

class ProfileContainer extends React.Component<ProfileAPIPropsType> {
    componentDidMount() {
        let userID = this.props.match.params.userID;
        if(!userID) {
            userID = "2";
        }
        profileAPI.getProfileData(userID).then(data => {
                this.props.setUserProfile(data);
            });
    }
    render() {
        return <Profile {...this.props} profile={this.props.profile}/>;
    }
}

const mapStateToProps = (state: RootStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile
});

const WithUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, {setUserProfile})(WithUrlDataContainerComponent);