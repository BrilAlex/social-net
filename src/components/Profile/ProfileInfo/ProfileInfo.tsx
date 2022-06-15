import {ChangeEvent, FC} from "react";
import styles from "./ProfileInfo.module.css";
import defaultProfileBG from "./../../../assets/images/default_profile_bg.jpg";
import {ProfileType} from "../../../redux/profileReducer";
import {Preloader} from "../../common/Preloader/Preloader";
import defaultAvatar from "../../../assets/images/man_avatar.png";
import {ProfileStatus} from "./ProfileStatus";

type ProfileInfoPropsType = {
  isOwner: boolean
  profile: ProfileType | null
  status: string
  updateStatus: (newStatus: string) => void
  saveAvatar: (file: File) => void
};

export const ProfileInfo: FC<ProfileInfoPropsType> = (
  {isOwner, profile, status, updateStatus, saveAvatar}
) => {
  if (!profile) {
    return <Preloader/>;
  }

  const userAvatarSrc = profile.photos.large || defaultAvatar;

  const changeProfileAvatarHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files.length) {
      saveAvatar(e.currentTarget.files[0]);
    }
  };

  return (
    <div>
      <div className={styles.profileBackground}>
        <img src={defaultProfileBG} alt={"Profile background"}/>
      </div>
      <div className={styles.profileInfoBlock}>
        <div className={styles.profileAvatar}>
          <img src={userAvatarSrc} alt={profile.fullName}/>
          {isOwner && <input type={"file"} onChange={changeProfileAvatarHandler}/>}
        </div>
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
