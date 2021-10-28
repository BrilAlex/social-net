import React from 'react';
import styles from "./ProfileInfo.module.css";
import {ProfileType} from "../../../redux/profileReducer";
import {Preloader} from "../../common/Preloader/Preloader";

type ProfileInfoPropsType = {
    profile: ProfileType
}

export const ProfileInfo: React.FC<ProfileInfoPropsType> = (props) => {
    debugger;
    if(!props.profile.userId) return <Preloader/>;
    return (
        <div>
            <div>
                <img src={""} alt={"ProfileInfo Background"}/>
            </div>
            <div className={styles.profileInfo}>
                <img src={props.profile.photos.large} alt={"ProfileInfo Avatar"}/>
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