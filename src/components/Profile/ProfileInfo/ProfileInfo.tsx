import React from "react";
import styles from "./ProfileInfo.module.css";
import defaultProfileBG from "./../../../assets/images/default_profile_bg.jpg";
import manAvatar from "./../../../assets/images/man_avatar.png";

export const ProfileInfo = () => {
  return (
    <div>
      <div className={styles.profileBackground}>
        <img src={defaultProfileBG} alt={"Profile background"}/>
      </div>
      <div className={styles.profileInfoBlock}>
        <img src={manAvatar} alt={"Avatar"}/>
        <div className={styles.profileInfo}>Profile info</div>
      </div>
    </div>
  );
};