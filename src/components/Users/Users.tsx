import {FC} from "react";
import {UsersPropsType} from "./UsersContainer";
import styles from "./Users.module.css";
import axios from "axios";
import {UserType} from "../../redux/usersReducer";
import defaultUserPhoto from "../../assets/images/man_avatar.png";

type UsersAPIResponseType = {
  items: UserType[]
  totalCount: number
  error: string
};

export const Users: FC<UsersPropsType> = (props) => {
  if (props.users.length === 0) {
    axios.get<UsersAPIResponseType>("https://social-network.samuraijs.com/api/1.0/users").then(response => {
      props.setUsers(response.data.items);
    });
  }

  return (
    <div className={styles.usersPage}>
      {props.users.map(u => {
        return (
          <div key={u.id} className={styles.user}>
            <div className={styles.userAvatar}>
              <img src={u.photos.small ? u.photos.small : defaultUserPhoto} alt={u.name}/>
              {
                u.followed ?
                  <button onClick={() => props.unfollowUser(u.id)}>Unfollow</button>
                  :
                  <button onClick={() => props.followUser(u.id)}>Follow</button>
              }
            </div>
            <div className={styles.userInfo}>
              <p>{u.name}</p>
              <p>{u.status}</p>
              <p>{"u.location.country"}, {"u.location.city"}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};