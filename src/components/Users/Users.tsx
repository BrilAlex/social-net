import React from "react";
import styles from "./Users.module.css"
import {UserPropsType} from "./UsersContainer";

export const Users: React.FC<UserPropsType> = (props) => {
    if (props.usersData.length === 0) {
        props.setUsersCallback([
            {id: 1, fullName: "Dimych K.", avatarUrl: "Avatar", location: {country: "Belarus", city: "Minsk"}, status: "I am a boss", followed: true},
            {id: 2, fullName: "Svetlana D.", avatarUrl: "Avatar", location: {country: "Belarus", city: "Minsk"}, status: "I am so pretty", followed: true},
            {id: 3, fullName: "Sergei S.", avatarUrl: "Avatar", location: {country: "Ukraine", city: "Kiev"}, status: "I like football!", followed: false},
            {id: 4, fullName: "Andrew T.", avatarUrl: "Avatar", location: {country: "United States", city: "Philadelphia"}, status: "I free to help you to create good video Production", followed: false}
        ]);
    }

    return (
        <div>{props.usersData.map(u =>
            <div key={u.id} className={styles.user}>
                <div>
                    <p><img src={u.avatarUrl}/></p>
                    <p>{u.followed
                        ? <button onClick={() => props.unfollowCallback(u.id)}>Unfollow</button>
                        : <button onClick={() => props.followCallback(u.id)}>Follow</button>}
                    </p>
                </div>
                <div>
                    <p>{u.fullName}<br/><span>{u.status}</span></p>
                    <p>{u.location.country}, {u.location.city}</p>
                </div>
            </div>)}
        </div>
    );
}