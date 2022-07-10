import {AppStateType} from "./store";
import {createSelector} from "reselect";
import {UserType} from "../api/usersApi";

const usersSelector = (state: AppStateType) => {
  return state.usersPage.users
};

export const getUsers = createSelector(usersSelector, (users: Array<UserType>) => {
  return users;
});
export const getTotalUsersCount = (state: AppStateType) => {
  return state.usersPage.totalUsersCount;
};
export const getPageSize = (state: AppStateType) => {
  return state.usersPage.pageSize;
};
export const getCurrentPage = (state: AppStateType) => {
  return state.usersPage.currentPage;
};
export const getIsFetching = (state: AppStateType) => {
  return state.usersPage.isFetching;
};
export const getFollowingInProgress = (state: AppStateType) => {
  return state.usersPage.followingInProgress;
};