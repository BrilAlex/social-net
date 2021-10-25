import React from "react";
import {connect} from "react-redux";
import {Users} from "./Users";
import {
    followAC,
    setCurrentPageAC, setTotalUsersCountAC,
    setUsersAC,
    unfollowAC,
    UsersActionTypes,
    UsersPageType,
    UserType
} from "../../redux/usersReducer";
import {RootStateType} from "../../redux/reduxStore";

type MapStateToPropsType = UsersPageType;
type MapDispatchToPropsType = {
    followCallback: (userID: number) => void
    unfollowCallback: (userID: number) => void
    setUsersCallback: (users: Array<UserType>) => void
    setCurrentPageCallback: (pageNumber: number) => void
    setTotalUsersCountCallback: (totalCount: number) => void
};
export type UserPropsType = MapStateToPropsType & MapDispatchToPropsType;

const mapStateToProps = (state:RootStateType): MapStateToPropsType => {
    return {
        usersData: state.usersPage.usersData,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
    };
}
const mapDispatchToProps = (dispatch: (action: UsersActionTypes) => void): MapDispatchToPropsType => {
    return {
        followCallback: (userID: number) => dispatch(followAC(userID)),
        unfollowCallback: (userID: number) => dispatch(unfollowAC(userID)),
        setUsersCallback: (users: Array<UserType>) => dispatch(setUsersAC(users)),
        setCurrentPageCallback: (pageNumber: number) => dispatch(setCurrentPageAC(pageNumber)),
        setTotalUsersCountCallback: (totalCount: number) => dispatch(setTotalUsersCountAC(totalCount)),
    };
}

export const UsersContainer = connect(mapStateToProps,mapDispatchToProps)(Users);