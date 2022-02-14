import React from "react";
import styles from "./Profile.module.css";
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ProfileType} from "../../index";

type ProfilePropsType = {
  profile: ProfileType
}

export const Profile = (props: ProfilePropsType) => {
  return (
    <div className={styles.profilePage}>
      <ProfileInfo/>
      <MyPosts posts={props.profile.posts}/>
    </div>
  );
}