import React, {ChangeEvent} from "react";
import {Post} from "./Post/Post";
import s from "./MyPost.module.css";
import {ActionTypes, PostType} from "../../../redux/state";
import {addNewPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profileReducer";

type MyPostsProps = {
    postsList: Array<PostType>
    newPostText: string
    dispatchCallback: (action: ActionTypes) => void
};

export const MyPosts: React.FC<MyPostsProps> = (props) => {

    const addPostHandler = () => {
        props.dispatchCallback(addNewPostActionCreator());
    };

    const updateNewPostTextHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let newText = e.currentTarget.value;
        const action = updateNewPostTextActionCreator(newText);
        props.dispatchCallback(action);
    }

    let postsElements = props.postsList.map(post =>
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