import React from "react";
import styles from "./Post.module.css";
import manAvatar from "./../../../../assets/images/man_avatar.png";

type PostPropsType = {
  postText: string
  likesCount: number
}

export const Post: React.FC<PostPropsType> = (props) => {
  return (
    <div className={styles.item}>
      <img src={manAvatar} alt={"User Avatar"}/>
      <div className={styles.itemText}>
        <p>{props.postText}</p>
        <p>Likes: {props.likesCount}</p>
      </div>
    </div>
  );
}