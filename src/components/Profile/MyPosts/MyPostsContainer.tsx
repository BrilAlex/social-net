import React from "react";
import {RootStoreType} from "../../../redux/reduxStore";
import {addNewPostAC, updateNewPostTextAC} from "../../../redux/profileReducer";
import {MyPosts} from "./MyPosts";

type MyPostsContainerProps = {
    store: RootStoreType
};

export const MyPostsContainer = (props: MyPostsContainerProps) => {
    let state = props.store.getState();
    let postLists = state.profilePage.postsData;
    let newPostText = state.profilePage.newPostText

    const addPost = () => {
        props.store.dispatch(addNewPostAC());
    };

    const updateNewPostText = (newText: string) => {
        const action = updateNewPostTextAC(newText);
        props.store.dispatch(action);
    }

    return <MyPosts
        postsList={postLists}
        newPostText={newPostText}
        addPostCallback={addPost}
        updateNewPostTextCallback={updateNewPostText}
    />;
};