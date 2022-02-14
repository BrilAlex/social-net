import React from "react";
import styles from "./MyPosts.module.css";
import {Post} from "./Post/Post";

export const MyPosts = () => {
  const postsData = [
    {id: 1, postText: "It's my first post", likesCount: 10},
    {id: 1, postText: "It's my first post", likesCount: 10},
  ];
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
        <Post postText={postsData[0].postText} likesCount={postsData[0].likesCount}/>
        <Post postText={postsData[1].postText} likesCount={postsData[1].likesCount}/>
      </div>
    </div>
  );
}