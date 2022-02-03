import React from "react";
import styles from "./Navbar.module.css";

export const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <div className={`${styles.item} ${styles.active}`}>
        <a href={"#1"}>Profile</a>
      </div>
      <div className={styles.item}>
        <a href={"#2"}>Messages</a>
      </div>
      <div className={styles.item}>
        <a href={"#3"}>News</a>
      </div>
      <div className={styles.item}>
        <a href={"#4"}>Music</a>
      </div>
      <div className={styles.item}>
        <a href={"#5"}>Settings</a>
      </div>
    </nav>
  );
}