import React from "react";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/store";
import {follow, requestUsers, unfollow} from "../../redux/usersReducer";
import {Users} from "./Users";
import {Preloader} from "../common/Preloader/Preloader";
import {
  getCurrentPage, getFollowingInProgress, getIsFetching,
  getPageSize,
  getTotalUsersCount,
  getUsers
} from "../../redux/usersSelectors";
import {UserType} from "../../api/usersApi";

type MapStateToPropsType = {
  users: Array<UserType>
  totalUsersCount: number
  pageSize: number
  currentPage: number
  isFetching: boolean
  followingInProgress: Array<number>
};

type MapDispatchToPropsType = {
  follow: (user_ID: number) => void
  unfollow: (user_ID: number) => void
  requestUsers: (currentPage: number, pageSize: number) => void
};

type UsersContainerPropsType = MapStateToPropsType & MapDispatchToPropsType;

class UsersContainer extends React.Component<UsersContainerPropsType> {
  componentDidMount() {
    const {currentPage, pageSize} = this.props;
    this.props.requestUsers(currentPage, pageSize);
  };

  setCurrentPage = (pageNumber: number) => {
    const {pageSize} = this.props;
    this.props.requestUsers(pageNumber, pageSize);
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
          followUser={this.props.follow}
          unfollowUser={this.props.unfollow}
          followingInProgress={this.props.followingInProgress}
        />
    );
  };
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    users: getUsers(state),
    totalUsersCount: getTotalUsersCount(state),
    pageSize: getPageSize(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  };
};

export default connect(mapStateToProps, {
  follow,
  unfollow,
  requestUsers,
})(UsersContainer);