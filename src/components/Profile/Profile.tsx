import React from "react";
import styles from "./Profile.module.css";
import {MyPosts} from "./MyPosts/MyPosts";

export const Profile = () => {
  return (
    <div>
      <div className={styles.profileBackground}>
        <img src={""} alt={"Profile background"}/>
      </div>
      <div className={styles.profileInfo}>
        <img src={""} alt={"Avatar"}/>
        <div>Profile info</div>
      </div>
      <MyPosts/>
    </div>
  );
}