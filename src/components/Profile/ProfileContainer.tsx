import React from 'react';
import {Profile} from "./Profile";
import {getUserProfile, ProfileType} from "../../redux/profileReducer";
import {connect} from "react-redux";
import {RootStateType} from "../../redux/reduxStore";
import {RouteComponentProps, withRouter} from "react-router-dom";

type PathParamsType = {
    userID: string
}

type MapStateToPropsType = {
    profile: ProfileType
};
type MapDispatchToPropsType = {
    getUserProfile: (userID: string) => void
};
type ProfileAPIPropsType = RouteComponentProps<PathParamsType> &
    MapStateToPropsType & MapDispatchToPropsType;

class ProfileContainer extends React.Component<ProfileAPIPropsType> {
    componentDidMount() {
        let userID = this.props.match.params.userID;
        if(!userID) {
            userID = "2";
        }
        this.props.getUserProfile(userID);
    }
    render() {
        return <Profile {...this.props} profile={this.props.profile}/>;
    }
}

const mapStateToProps = (state: RootStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile
});

const WithUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, {
    getUserProfile
})(WithUrlDataContainerComponent);