import React from 'react';
import styles from "./Profile.module.css";
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo"
import {ActionTypes, PostType} from "../../redux/state";

type ProfilePageProps = {
    postsData: Array<PostType>
    newPostText: string
    dispatchCallback: (action: ActionTypes) => void
};

export const Profile: React.FC<ProfilePageProps> = (props) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts
                postsList={props.postsData}
                newPostText={props.newPostText}
                dispatchCallback={props.dispatchCallback}
            />
        </div>
    );
};