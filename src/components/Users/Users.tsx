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

export const Users: React.FC<UserPropsType> = (props) => {
    if (props.usersData.length === 0) {
        axios.get<UsersResponseType>("https://social-network.samuraijs.com/api/1.0/users")
            .then(response => props.setUsersCallback(response.data.items)
        );
    }

    return (
        <div>{props.usersData.map(u =>
            <div key={u.id} className={styles.user}>
                <div>
                    <p><img src={u.photos.small ? u.photos.small : defaultUserPhoto}/></p>
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