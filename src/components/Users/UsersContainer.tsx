import React from "react";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/reduxStore";
import {
  followUserAC, setCurrentPageAC, setTotalUsersCountAC,
  setUsersAC, toggleIsFetchingAC,
  unfollowUserAC,
  UsersInitStateType,
  UserType
} from "../../redux/usersReducer";
import {Dispatch} from "redux";
import axios from "axios";
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

type UsersAPIPropsType = MapStateToPropsType & MapDispatchToPropsType;

type UsersAPIResponseType = {
  items: UserType[]
  totalCount: number
  error: string
};

class UsersContainer extends React.Component<UsersAPIPropsType> {
  componentDidMount() {
    this.props.toggleIsFetching(true);
    axios.get<UsersAPIResponseType>(
      `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`
    ).then(response => {
      this.props.toggleIsFetching(false);
      this.props.setUsers(response.data.items);
      this.props.setTotalUsersCount(response.data.totalCount);
    });
  };

  setCurrentPage = (pageNumber: number) => {
    this.props.toggleIsFetching(true);
    this.props.setCurrentPage(pageNumber);
    axios.get<UsersAPIResponseType>(
      `https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`
    ).then(response => {
      this.props.toggleIsFetching(false);
      this.props.setUsers(response.data.items);
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

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
  return {
    followUser: (user_ID) => dispatch(followUserAC(user_ID)),
    unfollowUser: (user_ID) => dispatch(unfollowUserAC(user_ID)),
    setUsers: (users) => dispatch(setUsersAC(users)),
    setTotalUsersCount: (totalCount) => dispatch(setTotalUsersCountAC(totalCount)),
    setCurrentPage: (pageNumber) => dispatch(setCurrentPageAC(pageNumber)),
    toggleIsFetching: (isFetching) => dispatch(toggleIsFetchingAC(isFetching)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);