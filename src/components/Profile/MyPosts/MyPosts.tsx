import React, {ChangeEvent} from "react";
import styles from "./MyPosts.module.css";
import {Post} from "./Post/Post";
import {
  ActionType,
  addPostAC,
  PostType,
  updateNewPostTextAC
} from "../../../redux/store";

type MyPostsPropsType = {
  posts: Array<PostType>
  newPostText: string
  dispatch: (action: ActionType) => void
};

export const MyPosts: React.FC<MyPostsPropsType> = (props) => {
  const postsElements = props.posts.map(p =>
    <Post
      key={p.id}
      postText={p.postText}
      likesCount={p.likesCount}
    />
  );

  const addPost = () => {
    if (props.newPostText !== "") {
      props.dispatch(addPostAC());
    }
  };

  const onChangeNewPostText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    props.dispatch(updateNewPostTextAC(e.currentTarget.value));
  };

  return (
    <div className={styles.postsBlock}>
      <h3>My posts</h3>
      <div className={styles.newPostBlock}>
          <textarea
            value={props.newPostText}
            onChange={onChangeNewPostText}
            placeholder={"Enter new post text"}
          />
          <button onClick={addPost}>Add post</button>
      </div>
      <div className={styles.postsList}>
        {postsElements}
      </div>
    </div>
  );
}