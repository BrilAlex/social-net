import React from "react";
import styles from "./MyPosts.module.css";
import {Post} from "./Post/Post";

export const MyPosts = () => {
  const posts = [
    {id: 1, postText: "It's my first post", likesCount: 10},
    {id: 2, postText: "It's my first post", likesCount: 10},
  ];

  const postsElements = posts.map(p =>
    <Post
      key={p.id}
      postText={p.postText}
      likesCount={p.likesCount}
    />
  );

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
        {postsElements}
      </div>
    </div>
  );
}