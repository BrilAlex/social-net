import {FC} from "react";
import styles from "./Profile.module.css";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../redux/profileReducer";

type ProfilePropsType = {
  isOwner: boolean
  profile: ProfileType | null
  status: string
  updateStatus: (newStatus: string) => void
  saveAvatar: (file: File) => void
};

export const Profile: FC<ProfilePropsType> = (props) => {
  return (
    <div className={styles.profilePage}>
      <ProfileInfo
        isOwner={props.isOwner}
        profile={props.profile}
        status={props.status}
        updateStatus={props.updateStatus}
        saveAvatar={props.saveAvatar}
      />
      <MyPostsContainer/>
    </div>
  );
};
