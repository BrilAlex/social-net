import React from "react";
import styles from "./Navbar.module.css";
import {NavLink} from "react-router-dom";

export const Navbar = () => {
  const getNavLinkClassName = (navData: { isActive: boolean }) => {
    return navData.isActive ? `${styles.navLink} ${styles.active}` : styles.navLink;
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.item}>
        <NavLink to={"/profile"} className={(navData) => getNavLinkClassName(navData)}>
          Profile
        </NavLink>
      </div>
      <div className={styles.item}>
        <NavLink to={"/dialogs"} className={(navData) => getNavLinkClassName(navData)}>
          Messages
        </NavLink>
      </div>
      <div className={styles.item}>
        <NavLink to={"/news"} className={(navData) => getNavLinkClassName(navData)}>
          News
        </NavLink>
      </div>
      <div className={styles.item}>
        <NavLink to={"/music"} className={(navData) => getNavLinkClassName(navData)}>
          Music
        </NavLink>
      </div>
      <div className={styles.item}>
        <NavLink to={"/users"} className={(navData) => getNavLinkClassName(navData)}>
          Users
        </NavLink>
      </div>
      <div className={styles.item}>
        <NavLink to={"/settings"} className={(navData) => getNavLinkClassName(navData)}>
          Settings
        </NavLink>
      </div>
    </nav>
  );
};