import React from "react";
import styles from "./MyPosts.module.css";
import {Post} from "./Post/Post";
import {PostType} from "../../../redux/state";

type MyPostsPropsType = {
  posts: Array<PostType>
};

export const MyPosts = (props: MyPostsPropsType) => {
  const postsElements = props.posts.map(p =>
    <Post
      key={p.id}
      postText={p.postText}
      likesCount={p.likesCount}
    />
  );

  return (
    <div className={styles.postsBlock}>
      <h3>My posts</h3>
      <div className={styles.newPostBlock}>
          <textarea>Enter new post text</textarea>
          <button>Add post</button>
      </div>
      <div className={styles.postsList}>
        {postsElements}
      </div>
    </div>
  );
}