import React from "react";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/reduxStore";
import {
  followUser, setCurrentPage, setTotalUsersCount,
  setUsers, toggleIsFetching,
  unfollowUser,
  UsersInitStateType,
  UserType
} from "../../redux/usersReducer";
import {usersAPI} from "../../api/api";
import {Users} from "./Users";
import {Preloader} from "../common/Preloader/Preloader";

type MapStateToPropsType = UsersInitStateType;

type MapDispatchToPropsType = {
  followUser: (user_ID: number) => void
  unfollowUser: (user_ID: number) => void
  setUsers: (users: UserType[]) => void
  setTotalUsersCount: (totalCount: number) => void
  setCurrentPage: (pageNumber: number) => void
  toggleIsFetching: (isFetching: boolean) => void
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
  };
};

export default connect(mapStateToProps, {
  followUser,
  unfollowUser,
  setUsers,
  setTotalUsersCount,
  setCurrentPage,
  toggleIsFetching,
})(UsersContainer);