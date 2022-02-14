import React from "react";
import styles from "./Profile.module.css";
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";

export type PostType = {
  id: number
  postText: string
  likesCount: number
}

export const Profile = () => {
  const posts: Array<PostType> = [
    {id: 1, postText: "It's my first post", likesCount: 10},
    {id: 2, postText: "It's my first post", likesCount: 10},
  ];

  return (
    <div className={styles.profilePage}>
      <ProfileInfo/>
      <MyPosts posts={posts}/>
    </div>
  );
}