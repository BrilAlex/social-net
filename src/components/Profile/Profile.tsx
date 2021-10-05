import React from 'react';
import {ProfileInfo} from "./ProfileInfo/ProfileInfo"
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";

type ProfilePageProps = {};

export const Profile = (props: ProfilePageProps) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPostsContainer/>
        </div>
    );
};