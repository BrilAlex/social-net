import React from "react";
import styles from "./MyPosts.module.css";
import {Post} from "./Post/Post";
import {PostType} from "../../../redux/state";

type MyPostsPropsType = {
  posts: Array<PostType>
};

export const MyPosts: React.FC<MyPostsPropsType> = (props) => {
  const postsElements = props.posts.map(p =>
    <Post
      key={p.id}
      postText={p.postText}
      likesCount={p.likesCount}
    />
  );

  const newPostTextarea = React.createRef<HTMLTextAreaElement>();

  const addPostHandler = () => {
    const newPostText = newPostTextarea.current?.value;
    console.log(newPostText);
  };

  return (
    <div className={styles.postsBlock}>
      <h3>My posts</h3>
      <div className={styles.newPostBlock}>
          <textarea ref={newPostTextarea}>Enter new post text</textarea>
          <button onClick={addPostHandler}>Add post</button>
      </div>
      <div className={styles.postsList}>
        {postsElements}
      </div>
    </div>
  );
}