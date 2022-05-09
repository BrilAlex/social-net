import React from "react";
import styles from "./MyPosts.module.css";
import {Post} from "./Post/Post";
import {MyPostsPropsType} from "./MyPostsContainer";
import {AddNewPostFormContainer, AddNewPostFormDataType} from "./AddNewPostForm/AddNewPostForm";

export const MyPosts: React.FC<MyPostsPropsType> = (props) => {
  const postsElements = props.posts.map(p =>
    <Post
      key={p.id}
      postText={p.postText}
      likesCount={p.likesCount}
    />
  );

  const addNewPost = (formData: AddNewPostFormDataType) => {
    props.addNewPost(formData.newPostText);
  };

  return (
    <div className={styles.postsBlock}>
      <h3>My posts</h3>
      <AddNewPostFormContainer onSubmit={addNewPost}/>
      <div className={styles.postsList}>
        {postsElements}
      </div>
    </div>
  );
};