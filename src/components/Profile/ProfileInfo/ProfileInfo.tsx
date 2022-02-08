import React from "react";
import styles from "../Profile.module.css";

export const ProfileInfo = () => {
  return (
    <div className={styles.profileInfoBlock}>
      <div className={styles.profileBackground}>
        <img src={""} alt={"Profile background"}/>
      </div>
      <div className={styles.profileInfo}>
        <img src={""} alt={"Avatar"}/>
        <div>Profile info</div>
      </div>
    </div>
  );
};