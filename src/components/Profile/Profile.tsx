import React from "react";
import styles from "./Profile.module.css";
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ProfilePageType} from "../../redux/state";

type ProfilePropsType = {
  state: ProfilePageType
}

export const Profile = (props: ProfilePropsType) => {
  return (
    <div className={styles.profilePage}>
      <ProfileInfo/>
      <MyPosts posts={props.state.posts}/>
    </div>
  );
}