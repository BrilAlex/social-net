import {connect} from "react-redux";
import {Users} from "./Users";
import {AppStateType} from "../../redux/reduxStore";
import {
  followUserAC,
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
};

export type UsersPropsType = MapStateToPropsType & MapDispatchToPropsType;

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    users: state.usersPage.users,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
  return {
    followUser: (user_ID) => dispatch(followUserAC(user_ID)),
    unfollowUser: (user_ID) => dispatch(unfollowUserAC(user_ID)),
    setUsers: (users) => dispatch(setUsersAC(users)),
  };
};

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);