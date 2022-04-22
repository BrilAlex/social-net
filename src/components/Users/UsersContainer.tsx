import React from "react";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/reduxStore";
import {
  followUser,
  getUsers,
  setCurrentPage,
  toggleFollowingProgress,
  unfollowUser,
  UserType
} from "../../redux/usersReducer";
import {Users} from "./Users";
import {Preloader} from "../common/Preloader/Preloader";

type MapStateToPropsType = {
  users: Array<UserType>
  totalUsersCount: number
  pageSize: number
  currentPage: number
  isFetching: boolean
  followingInProgress: Array<number>
};

type MapDispatchToPropsType = {
  followUser: (user_ID: number) => void
  unfollowUser: (user_ID: number) => void
  setCurrentPage: (pageNumber: number) => void
  toggleFollowingProgress: (inProgress: boolean, user_ID: number) => void
  getUsers: (currentPage: number, pageSize: number) => void
};

type UsersContainerPropsType = MapStateToPropsType & MapDispatchToPropsType;

class UsersContainer extends React.Component<UsersContainerPropsType> {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
  };

  setCurrentPage = (pageNumber: number) => {
    this.props.setCurrentPage(pageNumber);
    this.props.getUsers(pageNumber, this.props.pageSize);
  };

  render() {
    return (
      this.props.isFetching ?
        <Preloader/>
        :
        <Users
          users={this.props.users}
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          setCurrentPage={this.setCurrentPage}
          followUser={this.props.followUser}
          unfollowUser={this.props.unfollowUser}
          followingInProgress={this.props.followingInProgress}
          toggleFollowingProgress={this.props.toggleFollowingProgress}
        />
    );
  };
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    users: state.usersPage.users,
    totalUsersCount: state.usersPage.totalUsersCount,
    pageSize: state.usersPage.pageSize,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    followingInProgress: state.usersPage.followingInProgress,
  };
};

export default connect(mapStateToProps, {
  followUser,
  unfollowUser,
  setCurrentPage,
  toggleFollowingProgress,
  getUsers
})(UsersContainer);