import React, {ChangeEvent} from "react";
import {Post} from "./Post/Post";
import s from "./MyPost.module.css";
import {ActionType, addNewPostActionCreator, PostType, updateNewPostTextActionCreator} from "../../../redux/state";

type MyPostsProps = {
    postsList: Array<PostType>
    newPostText: string
    dispatchCallback: (action: ActionType) => void
};

export const MyPosts: React.FC<MyPostsProps> = (props) => {
    let postsElements = props.postsList.map(post =>
        <Post
            key={post.id}
            id={post.id}
            postText={post.postText}
            likesCounter={post.likesCounter}
        />
    );

    const addPostHandler = () => {
        props.dispatchCallback(addNewPostActionCreator());
    };

    const updateNewPostTextHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let newText = e.currentTarget.value;
        const action = updateNewPostTextActionCreator(newText);
        props.dispatchCallback(action);
    }

    return (
        <div>
            <h3>My Posts</h3>
            <div className={s.newPostBlock}>
                <textarea
                    onChange={updateNewPostTextHandler}
                    value={props.newPostText}
                />
                <button onClick={addPostHandler}>Add new post</button>
            </div>
            <div>
                {postsElements}
            </div>
        </div>
    );
};