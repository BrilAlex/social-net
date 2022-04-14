import {FC} from "react";
import styles from "./Users.module.css";
import defaultUserPhoto from "../../assets/images/man_avatar.png";
import {UserType} from "../../redux/usersReducer";
import {NavLink} from "react-router-dom";
import axios from "axios";

type UsersPropsType = {
  users: Array<UserType>
  totalUsersCount: number
  pageSize: number
  currentPage: number
  setCurrentPage: (pageNumber: number) => void
  followUser: (user_ID: number) => void
  unfollowUser: (user_ID: number) => void
};

type FollowAPIResponseType = {
  resultCode: number
  messages: Array<string>
  data: {}
};

export const Users: FC<UsersPropsType> = (props) => {
  const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  let pages: Array<number> = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  const followUser = (user_ID: number) => {
    axios.post<FollowAPIResponseType>(
      `https://social-network.samuraijs.com/api/1.0/follow/${user_ID}`,
      {},
      {withCredentials: true, headers: {"API-KEY": "07a6853a-00ae-46be-89bd-7635822fedbc"}}
    ).then(response => {
      if (response.data.resultCode === 0) props.followUser(user_ID);
    });
  };
  const unfollowUser = (user_ID: number) => {
    axios.delete<FollowAPIResponseType>(
      `https://social-network.samuraijs.com/api/1.0/follow/${user_ID}`,
      {withCredentials: true, headers: {"API-KEY": "07a6853a-00ae-46be-89bd-7635822fedbc"}}
    ).then(response => {
      if (response.data.resultCode === 0) props.unfollowUser(user_ID);
    });
  };

  return (
    <div className={styles.usersPage}>
      <div className={styles.pagination}>
        {
          pages.map((p, i) =>
            <span
              key={"page-" + i}
              className={p === props.currentPage ? styles.selectedPage : ""}
              onClick={() => props.setCurrentPage(p)}
            >
                {p}
              </span>
          )
        }
      </div>
      {props.users.map(u => {
        return (
          <div key={u.id} className={styles.user}>
            <div className={styles.userAvatar}>
              <NavLink to={`/profile/${u.id}`}>
                <img src={u.photos.small ? u.photos.small : defaultUserPhoto} alt={u.name}/>
              </NavLink>
              {
                u.followed ?
                  <button onClick={() => unfollowUser(u.id)}>Unfollow</button>
                  :
                  <button onClick={() => followUser(u.id)}>Follow</button>
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
}