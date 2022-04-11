import {FC} from "react";
import styles from "./ProfileInfo.module.css";
import defaultProfileBG from "./../../../assets/images/default_profile_bg.jpg";
import {ProfileType} from "../../../redux/profileReducer";
import {Preloader} from "../../common/Preloader/Preloader";

type ProfileInfoPropsType = {
  profile: ProfileType
};

export const ProfileInfo: FC<ProfileInfoPropsType> = (props) => {
  if (!props.profile.userId) {
    return <Preloader/>;
  }

  return (
    <div>
      <div className={styles.profileBackground}>
        <img src={defaultProfileBG} alt={"Profile background"}/>
      </div>
      <div className={styles.profileInfoBlock}>
        <img src={props.profile.photos.large} alt={props.profile.fullName}/>
        <div className={styles.profileInfo}>
          <p>Profile description:</p>
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