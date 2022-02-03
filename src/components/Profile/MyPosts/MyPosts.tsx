import React from "react";
import styles from "./MyPosts.module.css";
import {Post} from "./Post/Post";

export const MyPosts = () => {
  return (
    <div>
      <h3>My posts</h3>
      <div>
        <textarea>Enter new post text</textarea>
        <button>Add post</button>
      </div>
      <div className={styles.postList}>
        <Post postText={"It's my first post"} likesCount={10}/>
        <Post postText={"Hi! How are you?"} likesCount={20}/>
      </div>
    </div>
  );
}