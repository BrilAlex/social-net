import React from "react";
import {connect} from "react-redux";
import {Users} from "./Users";
import {
    toggleIsFetching,
    follow,
    setCurrentPage, setTotalUsersCount,
    setUsers,
    unfollow,
    UsersActionTypes,
    UsersPageType,
    UserType
} from "../../redux/usersReducer";
import {RootStateType} from "../../redux/reduxStore";
import axios from "axios";
import {Preloader} from "../common/Preloader/Preloader";

type MapStateToPropsType = UsersPageType;
type MapDispatchToPropsType = {
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    setUsers: (users: Array<UserType>) => void
    setCurrentPage: (pageNumber: number) => void
    setTotalUsersCount: (totalCount: number) => void
    toggleIsFetching: (isFetching: boolean) => void
};
type UserAPIPropsType = MapStateToPropsType & MapDispatchToPropsType;

type UsersResponseType = {
    items: Array<UserType>
    totalCount: number
    error: string
}

class UsersContainer extends React.Component<UserAPIPropsType> {
    componentDidMount() {
        this.props.toggleIsFetching(true);
        axios.get<UsersResponseType>(
            `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`,
            {withCredentials: true}
        ).then(response => {
            this.props.toggleIsFetching(false);
            this.props.setUsers(response.data.items);
            this.props.setTotalUsersCount(response.data.totalCount);
        });
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber);
        this.props.toggleIsFetching(true);
        axios.get<UsersResponseType>(
            `https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`,
            {withCredentials: true}
        ).then(response => {
            this.props.toggleIsFetching(false);
            this.props.setUsers(response.data.items);
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
})(UsersContainer);