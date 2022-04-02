import React from "react";
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

export class Users extends React.Component<UsersPropsType> {
  componentDidMount() {
    axios.get<UsersAPIResponseType>("https://social-network.samuraijs.com/api/1.0/users").then(response => {
      this.props.setUsers(response.data.items);
    });
  };

  render() {
    return (
      <div className={styles.usersPage}>
        {this.props.users.map(u => {
          return (
            <div key={u.id} className={styles.user}>
              <div className={styles.userAvatar}>
                <img src={u.photos.small ? u.photos.small : defaultUserPhoto} alt={u.name}/>
                {
                  u.followed ?
                    <button onClick={() => this.props.unfollowUser(u.id)}>Unfollow</button>
                    :
                    <button onClick={() => this.props.followUser(u.id)}>Follow</button>
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
}