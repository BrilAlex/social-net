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
    constructor(props: UserPropsType) {
        super(props);
        axios.get<UsersResponseType>("https://social-network.samuraijs.com/api/1.0/users")
            .then(response => this.props.setUsersCallback(response.data.items));
    }
    render() {
        return (
            <div>
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