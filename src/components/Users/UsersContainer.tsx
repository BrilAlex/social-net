import React from "react";
import {connect} from "react-redux";
import {Users} from "./Users";
import {
    toggleIsFetching,
    follow,
    setCurrentPage, setTotalUsersCount,
    setUsers,
    unfollow,
    UsersPageType,
    UserType, toggleFollowingProgress
} from "../../redux/usersReducer";
import {RootStateType} from "../../redux/reduxStore";
import {Preloader} from "../common/Preloader/Preloader";
import {usersAPI} from "../../api/api";

type MapStateToPropsType = UsersPageType;
type MapDispatchToPropsType = {
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    setUsers: (users: Array<UserType>) => void
    setCurrentPage: (pageNumber: number) => void
    setTotalUsersCount: (totalCount: number) => void
    toggleIsFetching: (isFetching: boolean) => void
    toggleFollowingProgress: (followingInProgress: boolean, userID: number) => void
};
type UserAPIPropsType = MapStateToPropsType & MapDispatchToPropsType;

class UsersContainer extends React.Component<UserAPIPropsType> {
    componentDidMount() {
        this.props.toggleIsFetching(true);
        usersAPI.getUsersData(this.props.currentPage, this.props.pageSize).then(data => {
            this.props.toggleIsFetching(false);
            this.props.setUsers(data.items);
            this.props.setTotalUsersCount(data.totalCount);
        });
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber);
        this.props.toggleIsFetching(true);
        usersAPI.getUsersData(pageNumber, this.props.pageSize).then(data => {
            this.props.toggleIsFetching(false);
            this.props.setUsers(data.items);
        });
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                usersData={this.props.usersData}
                followCallback={this.props.follow}
                unfollowCallback={this.props.unfollow}
                followingInProgress={this.props.followingInProgress}
                toggleFollowingProgress={this.props.toggleFollowingProgress}
            />
        </>
    }
}

const mapStateToProps = (state: RootStateType): MapStateToPropsType => {
    return {
        usersData: state.usersPage.usersData,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
    };
}
/*const mapDispatchToProps = (dispatch: (action: UsersActionTypes) => void): MapDispatchToPropsType => {
    return {
        follow: (userID: number) => dispatch(follow(userID)),
        unfollow: (userID: number) => dispatch(unfollow(userID)),
        setUsers: (users: Array<UserType>) => dispatch(setUsers(users)),
        setCurrentPage: (pageNumber: number) => dispatch(setCurrentPage(pageNumber)),
        setTotalUsersCount: (totalCount: number) => dispatch(setTotalUsersCount(totalCount)),
        toggleIsFetching: (isFetching: boolean) => dispatch(toggleIsFetching(isFetching)),
    };
}*/

export default connect(mapStateToProps, {
    follow,
    unfollow,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toggleIsFetching,
    toggleFollowingProgress,
})(UsersContainer);