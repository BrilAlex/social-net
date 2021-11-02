import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from "./Header.module.css";

type HeaderPropsType = {
    login: string
    isAuth: boolean
}

export const Header: React.FC<HeaderPropsType> = (props) => {
    return (
        <header className={styles.header}>
            <img src={""} alt={"Logo"}/>
            <div className={styles.loginBlock}>
                {props.isAuth ? props.login : <NavLink to={"/login"}>Login</NavLink>}
            </div>
        </header>
    );
}