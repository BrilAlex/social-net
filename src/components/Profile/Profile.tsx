import React from "react";
import styles from "./Profile.module.css";
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";

export const Profile = () => {
  return (
    <div className={styles.profilePage}>
      <ProfileInfo/>
      <MyPosts/>
    </div>
  );
}