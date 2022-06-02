import {FC} from "react";
import styles from "./ProfileInfo.module.css";
import defaultProfileBG from "./../../../assets/images/default_profile_bg.jpg";
import {ProfileType} from "../../../redux/profileReducer";
import {Preloader} from "../../common/Preloader/Preloader";
import defaultAvatar from "../../../assets/images/man_avatar.png";
import {ProfileStatus} from "./ProfileStatus";

type ProfileInfoPropsType = {
  profile: ProfileType | null
  status: string
  updateStatus: (newStatus: string) => void
};

export const ProfileInfo: FC<ProfileInfoPropsType> = (
  {profile, status, updateStatus}
) => {
  if (!profile) {
    return <Preloader/>;
  }

  const userAvatarSrc = profile.photos.large ? profile.photos.large : defaultAvatar;

  return (
    <div>
      <div className={styles.profileBackground}>
        <img src={defaultProfileBG} alt={"Profile background"}/>
      </div>
      <div className={styles.profileInfoBlock}>
        <img src={userAvatarSrc} alt={profile.fullName}/>
        <div className={styles.profileInfo}>
          <h3>Profile description:</h3>
          <p>Name: {profile.fullName}</p>
          <ProfileStatus status={status} updateStatus={updateStatus}/>
          {profile.aboutMe && <p>About me: {profile.aboutMe}</p>}
          {profile.lookingForAJob ?
            <>
              <p>Looking for a job: Yes</p>
              <p>{profile.lookingForAJobDescription}</p>
            </>
            :
            <p>Looking for a job: No</p>
          }
        </div>
      </div>
    </div>
  );
};