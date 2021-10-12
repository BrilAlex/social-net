import React, {ChangeEvent} from "react";
import {Post} from "./Post/Post";
import s from "./MyPost.module.css";
import {MyPostsPropsType} from "./MyPostsContainer";

export const MyPosts: React.FC<MyPostsPropsType> = (props) => {

    const addPostHandler = () => {
        props.addPostCallback();
    };

    const updateNewPostTextHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let newText = e.currentTarget.value;
        props.updateNewPostTextCallback(newText);
    }

    let postsElements = props.postsData.map(post =>
        <Post
            key={post.id}
            id={post.id}
            postText={post.postText}
            likesCounter={post.likesCounter}
        />
    );

    return (
        <div>
            <h3>My Posts</h3>
            <div className={s.newPostBlock}>
                <textarea
                    value={props.newPostText}
                    placeholder={"Type your post here"}
                    onChange={updateNewPostTextHandler}
                />
                <button onClick={addPostHandler}>Add new post</button>
            </div>
            <div>
                {postsElements}
            </div>
        </div>
    );
};