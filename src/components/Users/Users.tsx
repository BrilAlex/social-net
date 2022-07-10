import {FC} from "react";
import styles from "./Users.module.css";
import {Pagination} from "../common/Pagination/Pagination";
import {User} from "./User/User";
import {UserType} from "../../api/usersApi";

type UsersPropsType = {
  users: Array<UserType>
  totalUsersCount: number
  pageSize: number
  currentPage: number
  setCurrentPage: (pageNumber: number) => void
  followUser: (user_ID: number) => void
  unfollowUser: (user_ID: number) => void
  followingInProgress: Array<number>
};

export const Users: FC<UsersPropsType> = (
  {
    totalUsersCount,
    pageSize,
    currentPage,
    setCurrentPage,
    users,
    ...props
  }
) => {
  return (
    <div className={styles.usersPage}>
      <Pagination
        totalItemsCount={totalUsersCount}
        pageSize={pageSize}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <div>
        {users.map(u => {
          return (
            <User
              key={u.id}
              user={u}
              followUser={props.followUser}
              unfollowUser={props.unfollowUser}
              followingInProgress={props.followingInProgress}
            />
          );
        })}
      </div>
    </div>
  );
}
