import React from 'react';
import {Profile} from "./Profile";
import axios from "axios";
import {ProfileType, setUserProfile} from "../../redux/profileReducer";
import {connect} from "react-redux";
import {RootStateType} from "../../redux/reduxStore";

type ProfileResponseType = ProfileType

class ProfileContainer extends React.Component<any, any> {
    componentDidMount() {
        axios.get<ProfileResponseType>("https://social-network.samuraijs.com/api/1.0/profile/2")
            .then(response => {
                this.props.setUserProfile(response.data);
            });
    }
    render() {
        return <Profile {...this.props} profile={this.props.profile}/>;
    }
}

const mapStateToProps = (state: RootStateType) => ({
    profile: state.profilePage.profile
});

export default connect(mapStateToProps, {setUserProfile})(ProfileContainer);