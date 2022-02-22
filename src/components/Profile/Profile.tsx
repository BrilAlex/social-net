import React from "react";
import styles from "./Profile.module.css";
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ProfilePageType} from "../../redux/state";

type ProfilePropsType = {
  state: ProfilePageType
  addPostCallback: (newPostText: string) => void
}

export const Profile: React.FC<ProfilePropsType> = (props) => {
  return (
    <div className={styles.profilePage}>
      <ProfileInfo/>
      <MyPosts posts={props.state.posts} addPostCallback={props.addPostCallback}/>
    </div>
  );
};