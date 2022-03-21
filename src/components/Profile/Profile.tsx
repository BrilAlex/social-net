import React from "react";
import styles from "./Profile.module.css";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";

export const Profile = () => {
  return (
    <div className={styles.profilePage}>
      <ProfileInfo/>
      <MyPostsContainer/>
    </div>
  );
};