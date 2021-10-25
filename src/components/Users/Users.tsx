import React from "react";
import styles from "./Users.module.css"
import {UserPropsType} from "./UsersContainer";
import axios from "axios";
import defaultUserPhoto from "../../assets/images/user.png";
import {UserType} from "../../redux/usersReducer";

type UsersResponseType = {
    items: Array<UserType>
    totalCount: number
    error: string
}

export class Users extends React.Component<UserPropsType> {
    componentDidMount() {
        axios.get<UsersResponseType>(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsersCallback(response.data.items);
                this.props.setTotalUsersCountCallback(response.data.totalCount);
            });
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPageCallback(pageNumber);
        axios.get<UsersResponseType>(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => this.props.setUsersCallback(response.data.items));
    }

    render() {
        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);
        let pages:Array<number> = [];
        for(let i = 1; i <= pagesCount; i++) {
            pages = [...pages, i];
        }
        return (
            <div>
                <div className={styles.pagination}>
                    {pages.map(p =>
                        <span
                            className={this.props.currentPage === p ? styles.selectedPage : ""}
                            onClick={() => this.onPageChanged(p)}
                        >
                            {p}
                        </span>)}
                </div>
                {this.props.usersData.map(u =>
                    <div key={u.id} className={styles.user}>
                        <div>
                            <p>
                                <img
                                    src={u.photos.small ? u.photos.small : defaultUserPhoto}
                                    alt={u.name}
                                />
                            </p>
                            <p>{u.followed
                                ? <button onClick={() => this.props.unfollowCallback(u.id)}>Unfollow</button>
                                : <button onClick={() => this.props.followCallback(u.id)}>Follow</button>}
                            </p>
                        </div>
                        <div>
                            <p>{u.name}<br/><span>{u.status}</span></p>
                            <p>{"u.location.country"}, {"u.location.city"}</p>
                        </div>
                    </div>)}
            </div>
        )
    }
}