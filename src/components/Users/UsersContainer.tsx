import {connect} from "react-redux";
import {Users} from "./Users";
import {AppStateType} from "../../redux/reduxStore";
import {
  followUserAC, setCurrentPageAC, setTotalUsersCountAC,
  setUsersAC,
  unfollowUserAC,
  UsersInitStateType,
  UserType
} from "../../redux/usersReducer";
import {Dispatch} from "redux";

type MapStateToPropsType = UsersInitStateType;

type MapDispatchToPropsType = {
  followUser: (user_ID: number) => void
  unfollowUser: (user_ID: number) => void
  setUsers: (users: UserType[]) => void
  setTotalUsersCount: (totalCount: number) => void
  setCurrentPage: (pageNumber: number) => void
};

export type UsersPropsType = MapStateToPropsType & MapDispatchToPropsType;

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    users: state.usersPage.users,
    totalUsersCount: state.usersPage.totalUsersCount,
    pageSize: state.usersPage.pageSize,
    currentPage: state.usersPage.currentPage,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
  return {
    followUser: (user_ID) => dispatch(followUserAC(user_ID)),
    unfollowUser: (user_ID) => dispatch(unfollowUserAC(user_ID)),
    setUsers: (users) => dispatch(setUsersAC(users)),
    setTotalUsersCount: (totalCount) => dispatch(setTotalUsersCountAC(totalCount)),
    setCurrentPage: (pageNumber) => dispatch(setCurrentPageAC(pageNumber)),
  };
};

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);