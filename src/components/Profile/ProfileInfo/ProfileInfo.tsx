import React from 'react';
import styles from "./ProfileInfo.module.css";
import {ProfileType} from "../../../redux/profileReducer";
import {Preloader} from "../../common/Preloader/Preloader";
import defaultUserAvatar from "../../../assets/images/user.png";

type ProfileInfoPropsType = {
    profile: ProfileType
}

export const ProfileInfo: React.FC<ProfileInfoPropsType> = (props) => {
    debugger;
    if(!props.profile.userId) return <Preloader/>;

    const getUserAvatarSrc = () => props.profile.photos.large ? props.profile.photos.large : defaultUserAvatar;

    return (
        <div>
            <div>
                <img src={""} alt={"ProfileInfo Background"}/>
            </div>
            <div className={styles.profileInfo}>
                <img src={getUserAvatarSrc()} alt={props.profile.fullName}/>
                <div>
                    <p>Profile description:</p>
                    <p>Name: {props.profile.fullName}</p>
                    <p>Looking for Job: {props.profile.lookingForAJob ? "Yes" : "No"}</p>
                    <p>Looking for Job Description: {props.profile.lookingForAJobDescription}</p>
                </div>
            </div>
        </div>
    );
}