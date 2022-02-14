import React from "react";
import styles from "./MyPosts.module.css";
import {Post} from "./Post/Post";
import {PostType} from "../../../index";

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