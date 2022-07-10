import {FC} from "react";
import styles from "./User.module.css";
import {NavLink} from "react-router-dom";
import defaultUserPhoto from "../../../assets/images/man_avatar.png";
import {UserType} from "../../../api/usersApi";

type UserPropsType = {
  user: UserType
  followUser: (user_ID: number) => void
  unfollowUser: (user_ID: number) => void
  followingInProgress: Array<number>
};

export const User: FC<UserPropsType> = (
  {user, followUser, unfollowUser, followingInProgress}
) => {
  const follow = (user_ID: number) => {
    followUser(user_ID);
  };
  const unfollow = (user_ID: number) => {
    unfollowUser(user_ID);
  };

  return (
    <div className={styles.user}>
      <div className={styles.userAvatar}>
        <NavLink to={`/profile/${user.id}`}>
          <img src={user.photos.small ? user.photos.small : defaultUserPhoto} alt={user.name}/>
        </NavLink>
        {
          user.followed ?
            <button
              onClick={() => unfollow(user.id)}
              disabled={followingInProgress.some(id => id === user.id)}
            >
              Unfollow
            </button>
            :
            <button
              onClick={() => follow(user.id)}
              disabled={followingInProgress.some(id => id === user.id)}
            >
              Follow
            </button>
        }
      </div>
      <div className={styles.userInfo}>
        <p>{user.name}</p>
        <p>{user.status}</p>
        <p>{"user.location.country"}, {"user.location.city"}</p>
      </div>
    </div>
  );
};