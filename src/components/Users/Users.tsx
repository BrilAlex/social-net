import {FC} from "react";
import {UsersPropsType} from "./UsersContainer";
import styles from "./Users.module.css";

export const Users: FC<UsersPropsType> = (props) => {
  if (props.users.length === 0) {
    props.setUsers([
      {
        id: 1,
        avatarUrl: "",
        fullName: "Dmitri K.",
        status: "I am looking for a job right now...",
        location: {country: "Belarus", city: "Minsk"},
        followed: false,
      },
      {
        id: 2,
        avatarUrl: "",
        fullName: "Svetlana D.",
        status: "I am so pretty",
        location: {country: "Belarus", city: "Minsk"},
        followed: false,
      },
      {
        id: 3,
        avatarUrl: "",
        fullName: "Sergei S.",
        status: "I like football!!!",
        location: {country: "Ukraine", city: "Kiev"},
        followed: true,
      },
      {
        id: 4,
        avatarUrl: "",
        fullName: "Andrew T.",
        status: "I am free to help you to create good Video Production",
        location: {country: "United States", city: "Philadelphia"},
        followed: true,
      },
    ]);
  }

  return (
    <div className={styles.usersPage}>
      {props.users.map(u => {
        return (
          <div key={u.id} className={styles.user}>
            <div className={styles.userAvatar}>
              <img src={u.avatarUrl} alt={u.fullName + " Avatar"}/>
              {
                u.followed ?
                  <button onClick={() => props.unfollowUser(u.id)}>Unfollow</button>
                  :
                  <button onClick={() => props.followUser(u.id)}>Follow</button>
              }
            </div>
            <div className={styles.userInfo}>
              <p>{u.fullName}</p>
              <p>{u.status}</p>
              <p>{u.location.country}, {u.location.city}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};