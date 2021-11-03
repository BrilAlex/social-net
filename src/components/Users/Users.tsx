import React from "react";
import styles from "./Users.module.css"
import defaultUserPhoto from "../../assets/images/user.png";
import {UserType} from "../../redux/usersReducer";
import {NavLink} from "react-router-dom";
import axios from "axios";

type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (currentPage: number) => void
    usersData: Array<UserType>
    followCallback: (userID: number) => void
    unfollowCallback: (userID: number) => void
}

type FollowResponseType = {
    resultCode: number
    messages: Array<string>
    data: {}
}

export const Users: React.FC<UsersPropsType> = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages = [...pages, i];
    }

    const followHandler = (userID: number) => {
        axios.post<FollowResponseType>(
            `https://social-network.samuraijs.com/api/1.0/follow/${userID}`,
            {},
            {
                withCredentials: true,
                headers: {"API-KEY": "07a6853a-00ae-46be-89bd-7635822fedbc"}
            }
        ).then(response => {
            if (response.data.resultCode === 0) {
                props.followCallback(userID);
            }
        });
    }
    const unfollowHandler = (userID: number) => {
        axios.delete<FollowResponseType>(
            `https://social-network.samuraijs.com/api/1.0/follow/${userID}`,
            {
                withCredentials: true,
                headers: {"API-KEY": "07a6853a-00ae-46be-89bd-7635822fedbc"}
            }
        ).then(response => {
            if(response.data.resultCode === 0) {
                props.unfollowCallback(userID);
            }
        });
    }

    return (
        <div>
            <div className={styles.pagination}>
                {pages.map((p,i) =>
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
                        <p>{u.followed
                            ? <button onClick={() => unfollowHandler(u.id)}>Unfollow</button>
                            : <button onClick={() => followHandler(u.id)}>Follow</button>}
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
