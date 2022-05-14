import {FC} from "react";
import styles from "./Header.module.css";
import logo from "./../../assets/images/logo.png";
import {NavLink} from "react-router-dom";

type HeaderPropsType = {
  login: string | null
  isAuth: boolean
  logout: () => void
};

export const Header: FC<HeaderPropsType> = (props) => {
  return (
    <header className={styles.header}>
      <img className={styles.logo} src={logo} alt={"Logo"}/>
      <div className={styles.loginBlock}>
        {props.isAuth ?
          <div className={styles.userInfo}>
            <span>{props.login}</span>
            <button onClick={props.logout}>Logout</button>
          </div>
          :
          <NavLink to={"/login"}>Login</NavLink>
        }
      </div>
    </header>
  );
};