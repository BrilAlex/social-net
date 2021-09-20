import React from 'react';
import styles from "./ProfileInfo.module.css";

export const ProfileInfo = () => {
    return (
        <div>
            <div>
                <img src={""} alt={"ProfileInfo Background"}/>
            </div>
            <div className={styles.profileInfo}>
                <img src={""} alt={"ProfileInfo Avatar"}/>
                <div>
                    Profile description
                </div>
            </div>
        </div>
    );
}