import React from "react";
import styles from "./Post.module.css";

type PostPropsType = {
  postText: string
  likesCount: number
}

export const Post = (props: PostPropsType) => {
  return (
    <div className={styles.item}>
      <img src={""} alt={"Avatar"}/>
      <div>
        <p>{props.postText}</p>
        <p>Likes: {props.likesCount}</p>
      </div>
    </div>
  );
}