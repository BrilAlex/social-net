import React from "react";
import styles from "./Post.module.css";
import {PostType} from "../../../../redux/profileReducer";

export const Post: React.FC<PostType> = (props) => {
    return (
        <div className={styles.item}>
            <img src="" alt="Avatar"/>
            <p>{props.postText}</p>
            <p>{props.likesCounter} like</p>
        </div>
    );
}
