import React from "react";
import {
    addNewPostAC,
    PostType,
    ProfileActionTypes,
    updateNewPostTextAC
} from "../../../redux/profileReducer";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {RootStateType} from "../../../redux/reduxStore";

type MapStateToPropsType = {
    postsData: Array<PostType>
    newPostText: string
};
type MapDispatchToPropsType = {
    addPostCallback: () => void
    updateNewPostTextCallback: (newText: string) => void
};

export type MyPostsPropsType = MapStateToPropsType & MapDispatchToPropsType;

const mapStateToProps = (state: RootStateType): MapStateToPropsType => {
    return {
        postsData: state.profilePage.postsData,
        newPostText: state.profilePage.newPostText
    }
};

const mapDispatchToProps =
    (dispatch: (action: ProfileActionTypes) => void): MapDispatchToPropsType => {
    return {
        addPostCallback: () => dispatch(addNewPostAC()),
        updateNewPostTextCallback: (newText: string) => {
            const action = updateNewPostTextAC(newText);
            dispatch(action);
        }
    }
};

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);