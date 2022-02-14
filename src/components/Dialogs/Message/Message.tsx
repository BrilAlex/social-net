import React from "react";
import styles from "./../Dialogs.module.css";

type MessagePropsType = {
  name: string
  messageText: string
  messageTime: string
};

export const Message = (props: MessagePropsType) => {
  return (
    <div className={styles.message}>
      <div className={styles.senderInfo}>
        <img className={styles.senderAvatar} src={""} alt={props.name + " avatar"}/>
        <p className={styles.senderName}>{props.name}</p>
      </div>
      <div className={styles.messageContent}>
        <p className={styles.messageText}>{props.messageText}</p>
        <span className={styles.messageTime}>{props.messageTime}</span>
      </div>
    </div>
  );
};