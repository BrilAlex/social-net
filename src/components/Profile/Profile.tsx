import React from 'react';
import {ProfileInfo} from "./ProfileInfo/ProfileInfo"
import {RootStoreType} from "../../redux/reduxStore";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";

type ProfilePageProps = {
    store: RootStoreType;
};

export const Profile = (props: ProfilePageProps) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPostsContainer store={props.store}/>
        </div>
    );
};