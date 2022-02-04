import React from "react";
import styles from "./Dialogs.module.css";

type DialogsPropsType = {};

export const Dialogs = (props: DialogsPropsType) => {
  return (
    <div className={styles.dialogsPage}>
      <div className={styles.dialogsContainer}>
        <div className={styles.dialog + " " + styles.active}>Karina</div>
        <div className={styles.dialog}>Dimych</div>
        <div className={styles.dialog}>Sergei</div>
        <div className={styles.dialog}>Alexander</div>
        <div className={styles.dialog}>Svetlana</div>
      </div>
      <div className={styles.messagesContainer}>
        <div className={styles.message}>
          <div className={styles.senderInfo}>
            <img className={styles.senderAvatar} src={""} alt={"My Avatar"}/>
            <p className={styles.senderName}>Me</p>
          </div>
          <div className={styles.messageContent}>
            <p className={styles.messageText}>Hi!</p>
            <span className={styles.messageTime}>12:05</span>
          </div>
        </div>
        <div className={styles.message}>
          <div className={styles.senderInfo}>
            <img className={styles.senderAvatar} src={""} alt={"User Avatar"}/>
            <p className={styles.senderName}>User</p>
          </div>
          <div className={styles.messageContent}>
            <p className={styles.messageText}>Yo! How are you?</p>
            <span className={styles.messageTime}>12:18</span>
          </div>
        </div>
        <div className={styles.message}>
          <div className={styles.senderInfo}>
            <img className={styles.senderAvatar} src={""} alt={"My Avatar"}/>
            <p className={styles.senderName}>Me</p>
          </div>
          <div className={styles.messageContent}>
            <p className={styles.messageText}>Fine, studying in IT-Incubator now. And you?</p>
            <span className={styles.messageTime}>12:24</span>
          </div>
        </div>
      </div>
    </div>
  );
};