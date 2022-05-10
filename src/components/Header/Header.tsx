import {FC} from "react";
import styles from "./Header.module.css";
import logo from "./../../assets/images/logo.png";
import {NavLink} from "react-router-dom";
import {ProfileType} from "../../redux/profileReducer";
import defaultAvatar from "../../assets/images/man_avatar.png";

type HeaderPropsType = {
  login: string
  isAuth: boolean
  profile: ProfileType
  logout: () => void
};

export const Header: FC<HeaderPropsType> = (props) => {
  return (
    <header className={styles.header}>
      <img className={styles.logo} src={logo} alt={"Logo"}/>
      <div className={styles.loginBlock}>
        {props.isAuth ?
          !props.profile.userId ?
            <span>Loading...</span>
            :
            <div className={styles.container}>
              <NavLink to={"/profile/" + props.profile.userId}>
                <img
                  src={props.profile.photos.small ? props.profile.photos.small : defaultAvatar}
                  alt={props.profile.fullName}
                />
              </NavLink>
              <div className={styles.userInfo}>
                <p>Name: {props.profile.fullName}</p>
                <p>
                  {props.login}
                  <button onClick={props.logout}>Logout</button>
                </p>
              </div>
            </div>
          :
          <NavLink to={"/login"}>Login</NavLink>
        }
      </div>
    </header>
  );
};