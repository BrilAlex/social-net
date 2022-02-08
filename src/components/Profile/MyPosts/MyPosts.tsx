import React from "react";
import styles from "./MyPosts.module.css";
import {Post} from "./Post/Post";

export const MyPosts = () => {
  return (
    <div className={styles.postsBlock}>
      <h3>My posts</h3>
      <div>
        <div>
          <textarea>Enter new post text</textarea>
        </div>
        <div>
          <button>Add post</button>
        </div>
      </div>
      <div className={styles.postList}>
        <Post postText={"It's my first post"} likesCount={10}/>
        <Post postText={"Hi! How are you?"} likesCount={20}/>
      </div>
    </div>
  );
}