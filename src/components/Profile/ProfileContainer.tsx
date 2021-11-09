import React from 'react';
import {Profile} from "./Profile";
import {getUserProfile, ProfileType} from "../../redux/profileReducer";
import {connect} from "react-redux";
import {RootStateType} from "../../redux/reduxStore";
import {Redirect, RouteComponentProps, withRouter} from "react-router-dom";

type PathParamsType = {
    userID: string
}

type MapStateToPropsType = {
    profile: ProfileType
    isAuth: boolean
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
        if(!this.props.isAuth) return <Redirect to={"/login"}/>;
        return <Profile {...this.props} profile={this.props.profile}/>;
    }
}

const mapStateToProps = (state: RootStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth,
});

const WithUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, {
    getUserProfile
})(WithUrlDataContainerComponent);