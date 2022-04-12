import {FC} from "react";
import styles from "./ProfileInfo.module.css";
import defaultProfileBG from "./../../../assets/images/default_profile_bg.jpg";
import {ProfileType} from "../../../redux/profileReducer";
import {Preloader} from "../../common/Preloader/Preloader";
import defaultAvatar from "../../../assets/images/man_avatar.png";

type ProfileInfoPropsType = {
  profile: ProfileType
};

export const ProfileInfo: FC<ProfileInfoPropsType> = (props) => {
  if (!props.profile.userId) {
    return <Preloader/>;
  }

  const userAvatarSrc = props.profile.photos.large ? props.profile.photos.large : defaultAvatar;

  return (
    <div>
      <div className={styles.profileBackground}>
        <img src={defaultProfileBG} alt={"Profile background"}/>
      </div>
      <div className={styles.profileInfoBlock}>
        <img src={userAvatarSrc} alt={props.profile.fullName}/>
        <div className={styles.profileInfo}>
          <h3>Profile description:</h3>
          <p>Name: {props.profile.fullName}</p>
          {props.profile.lookingForAJob ?
            <>
              <p>Looking for a job: Yes</p>
              <p>{props.profile.lookingForAJobDescription}</p>
            </>
            :
            <p>Looking for a job: No</p>
          }
        </div>
      </div>
    </div>
  );
};