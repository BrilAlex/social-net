import React from "react";
import {connect} from "react-redux";
import {Users} from "./Users";
import {
    toggleIsFetchingAC,
    followAC,
    setCurrentPageAC, setTotalUsersCountAC,
    setUsersAC,
    unfollowAC,
    UsersActionTypes,
    UsersPageType,
    UserType
} from "../../redux/usersReducer";
import {RootStateType} from "../../redux/reduxStore";
import axios from "axios";
import {Preloader} from "../common/Preloader/Preloader";

type MapStateToPropsType = UsersPageType;
type MapDispatchToPropsType = {
    followCallback: (userID: number) => void
    unfollowCallback: (userID: number) => void
    setUsersCallback: (users: Array<UserType>) => void
    setCurrentPageCallback: (pageNumber: number) => void
    setTotalUsersCountCallback: (totalCount: number) => void
    toggleIsFetchingCallback: (isFetching: boolean) => void
};
type UserAPIPropsType = MapStateToPropsType & MapDispatchToPropsType;

type UsersResponseType = {
    items: Array<UserType>
    totalCount: number
    error: string
}

class UsersContainer extends React.Component<UserAPIPropsType> {
    componentDidMount() {
        this.props.toggleIsFetchingCallback(true);
        axios.get<UsersResponseType>(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.toggleIsFetchingCallback(false);
                this.props.setUsersCallback(response.data.items);
                this.props.setTotalUsersCountCallback(response.data.totalCount);
            });
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPageCallback(pageNumber);
        this.props.toggleIsFetchingCallback(true);
        axios.get<UsersResponseType>(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.toggleIsFetchingCallback(false);
                this.props.setUsersCallback(response.data.items);
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
                followCallback={this.props.followCallback}
                unfollowCallback={this.props.unfollowCallback}
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
const mapDispatchToProps = (dispatch: (action: UsersActionTypes) => void): MapDispatchToPropsType => {
    return {
        followCallback: (userID: number) => dispatch(followAC(userID)),
        unfollowCallback: (userID: number) => dispatch(unfollowAC(userID)),
        setUsersCallback: (users: Array<UserType>) => dispatch(setUsersAC(users)),
        setCurrentPageCallback: (pageNumber: number) => dispatch(setCurrentPageAC(pageNumber)),
        setTotalUsersCountCallback: (totalCount: number) => dispatch(setTotalUsersCountAC(totalCount)),
        toggleIsFetchingCallback: (isFetching: boolean) => dispatch(toggleIsFetchingAC(isFetching)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);