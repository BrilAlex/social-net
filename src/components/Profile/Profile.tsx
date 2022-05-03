import {FC} from "react";
import styles from "./Profile.module.css";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../redux/profileReducer";

type ProfilePropsType = {
  profile: ProfileType
  status: string
  updateStatus: (newStatus: string) => void
};

export const Profile: FC<ProfilePropsType> = (props) => {
  return (
    <div className={styles.profilePage}>
      <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>
      <MyPostsContainer/>
    </div>
  );
};