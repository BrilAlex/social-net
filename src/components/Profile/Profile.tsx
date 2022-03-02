import React from "react";
import styles from "./Profile.module.css";
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ProfilePageType} from "../../redux/store";

type ProfilePropsType = {
  profilePage: ProfilePageType
  updateNewPostText: (text: string) => void
  addPost: () => void
}

export const Profile: React.FC<ProfilePropsType> = (props) => {
  return (
    <div className={styles.profilePage}>
      <ProfileInfo/>
      <MyPosts
        posts={props.profilePage.posts}
        newPostText={props.profilePage.newPostText}
        addPost={props.addPost}
        updateNewPostText={props.updateNewPostText}
      />
    </div>
  );
};