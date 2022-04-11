import {FC} from "react";
import styles from "./Profile.module.css";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../redux/profileReducer";

type ProfilePropsType = {
  profile: ProfileType
};

export const Profile: FC<ProfilePropsType> = (props) => {
  return (
    <div className={styles.profilePage}>
      <ProfileInfo profile={props.profile}/>
      <MyPostsContainer/>
    </div>
  );
};