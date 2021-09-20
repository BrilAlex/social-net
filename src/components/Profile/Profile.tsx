import React from 'react';
import styles from "./Profile.module.css";
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo"
import {PostType} from "../../redux/state";

type ProfilePageProps = {
    postsData: Array<PostType>
    newPostText: string
    addNewPostCallback: () => void
    updateNewPostTextCallback: (newPostText: string) => void
};

export const Profile: React.FC<ProfilePageProps> = (props) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts
                postsList={props.postsData}
                newPostText={props.newPostText}
                addNewPostCallback={props.addNewPostCallback}
                updateNewPostTextCallback={props.updateNewPostTextCallback}
            />
        </div>
    );
};