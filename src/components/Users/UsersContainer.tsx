import React from "react";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/reduxStore";
import {
  followUser, setCurrentPage, setTotalUsersCount,
  setUsers, toggleFollowingProgress, toggleIsFetching,
  unfollowUser,
  UserType
} from "../../redux/usersReducer";
import {usersAPI} from "../../api/api";
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
  setUsers: (users: UserType[]) => void
  setTotalUsersCount: (totalCount: number) => void
  setCurrentPage: (pageNumber: number) => void
  toggleIsFetching: (isFetching: boolean) => void
  toggleFollowingProgress: (inProgress: boolean, user_ID: number) => void
};

type UsersContainerPropsType = MapStateToPropsType & MapDispatchToPropsType;

class UsersContainer extends React.Component<UsersContainerPropsType> {
  componentDidMount() {
    this.props.toggleIsFetching(true);
    usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
      this.props.toggleIsFetching(false);
      this.props.setUsers(data.items);
      this.props.setTotalUsersCount(data.totalCount);
    });
  };

  setCurrentPage = (pageNumber: number) => {
    this.props.toggleIsFetching(true);
    this.props.setCurrentPage(pageNumber);
    usersAPI.getUsers(pageNumber, this.props.pageSize).then(data => {
      this.props.toggleIsFetching(false);
      this.props.setUsers(data.items);
    });
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
  setUsers,
  setTotalUsersCount,
  setCurrentPage,
  toggleIsFetching,
  toggleFollowingProgress,
})(UsersContainer);