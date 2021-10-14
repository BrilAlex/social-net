import React from "react";
import {connect} from "react-redux";
import {Users} from "./Users";
import {followAC, setUsersAC, unfollowAC, UsersActionTypes, UsersPageType, UserType} from "../../redux/usersReducer";
import {RootStateType} from "../../redux/reduxStore";

type MapStateToPropsType = UsersPageType;
type MapDispatchToPropsType = {
    followCallback: (userID: number) => void
    unfollowCallback: (userID: number) => void
    setUsersCallback: (users: Array<UserType>) => void
};
export type UserPropsType = MapStateToPropsType & MapDispatchToPropsType;

const mapStateToProps = (state:RootStateType): MapStateToPropsType => {
    return {usersData: state.usersPage.usersData};
}
const mapDispatchToProps = (dispatch: (action: UsersActionTypes) => void): MapDispatchToPropsType => {
    return {
        followCallback: (userID: number) => dispatch(followAC(userID)),
        unfollowCallback: (userID: number) => dispatch(unfollowAC(userID)),
        setUsersCallback: (users: Array<UserType>) => dispatch(setUsersAC(users))
    };
}

export const UsersContainer = connect(mapStateToProps,mapDispatchToProps)(Users);