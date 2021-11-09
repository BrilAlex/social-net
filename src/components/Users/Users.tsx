import React from "react";
import styles from "./Users.module.css"
import defaultUserPhoto from "../../assets/images/user.png";
import {UserType} from "../../redux/usersReducer";
import {NavLink} from "react-router-dom";

type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (currentPage: number) => void
    usersData: Array<UserType>
    followCallback: (userID: number) => void
    unfollowCallback: (userID: number) => void
    followingInProgress: Array<number>
}

export const Users: React.FC<UsersPropsType> = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages = [...pages, i];
    }

    return (
        <div>
            <div className={styles.pagination}>
                {pages.map((p, i) =>
                    <span
                        key={i}
                        className={props.currentPage === p ? styles.selectedPage : ""}
                        onClick={() => props.onPageChanged(p)}
                    >
                        {p}
                    </span>)}
            </div>
            {props.usersData.map(u =>
                <div key={u.id} className={styles.user}>
                    <div>
                        <p>
                            <NavLink to={`/profile/${u.id}`}>
                                <img
                                    src={u.photos.small ? u.photos.small : defaultUserPhoto}
                                    alt={u.name}
                                />
                            </NavLink>
                        </p>
                        <p>
                            {u.followed
                                ? <button
                                    onClick={() => props.unfollowCallback(u.id)}
                                    disabled={props.followingInProgress.some(id => id === u.id)}
                                >
                                    Unfollow
                                </button>
                                : <button
                                    onClick={() => props.followCallback(u.id)}
                                    disabled={props.followingInProgress.some(id => id === u.id)}
                                >
                                    Follow
                                </button>
                            }
                        </p>
                    </div>
                    <div>
                        <p>
                            <NavLink to={`/profile/${u.id}`}>{u.name}</NavLink>
                            <br/>
                            <span>{u.status}</span>
                        </p>
                        <p>{"u.location.country"}, {"u.location.city"}</p>
                    </div>
                </div>)}
        </div>
    );
}
