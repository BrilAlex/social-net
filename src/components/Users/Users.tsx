import React from "react";
import styles from "./Users.module.css"
import defaultUserPhoto from "../../assets/images/user.png";
import {UserType} from "../../redux/usersReducer";

type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (currentPage: number) => void
    usersData: Array<UserType>
    followCallback: (userID: number) => void
    unfollowCallback: (userID: number) => void
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
                {pages.map(p =>
                    <span
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
                            <img
                                src={u.photos.small ? u.photos.small : defaultUserPhoto}
                                alt={u.name}
                            />
                        </p>
                        <p>{u.followed
                            ? <button onClick={() => props.unfollowCallback(u.id)}>Unfollow</button>
                            : <button onClick={() => props.followCallback(u.id)}>Follow</button>}
                        </p>
                    </div>
                    <div>
                        <p>{u.name}<br/><span>{u.status}</span></p>
                        <p>{"u.location.country"}, {"u.location.city"}</p>
                    </div>
                </div>)}
        </div>
    );
}
