import React from "react";
import styles from "./Profile.module.css";
import {RootStoreType} from "../../redux/reduxStore";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";

type ProfilePropsType = {
  store: RootStoreType
}

export const Profile: React.FC<ProfilePropsType> = (props) => {
  return (
    <div className={styles.profilePage}>
      <ProfileInfo/>
      <MyPostsContainer store={props.store}/>
    </div>
  );
};