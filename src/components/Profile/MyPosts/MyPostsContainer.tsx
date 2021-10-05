import React from "react";
import {addNewPostAC, updateNewPostTextAC} from "../../../redux/profileReducer";
import {MyPosts} from "./MyPosts";
import { StoreContext } from "../../../StoreContext";

type MyPostsContainerProps = {};

export const MyPostsContainer = (props: MyPostsContainerProps) => {
    return (
        <StoreContext.Consumer>
            {
                store => {
                    let state = store.getState();
                    let postLists = state.profilePage.postsData;
                    let newPostText = state.profilePage.newPostText

                    const addPost = () => {
                        store.dispatch(addNewPostAC());
                    };

                    const updateNewPostText = (newText: string) => {
                        const action = updateNewPostTextAC(newText);
                        store.dispatch(action);
                    }
                    return <MyPosts
                        postsList={postLists}
                        newPostText={newPostText}
                        addPostCallback={addPost}
                        updateNewPostTextCallback={updateNewPostText}
                    />
                }
            }
        </StoreContext.Consumer>
    );
};