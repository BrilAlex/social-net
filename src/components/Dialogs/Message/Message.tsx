import React from "react";
import styles from "./Message.module.css";
import manAvatar from "./../../../assets/images/man_avatar.png";
import womanAvatar from "./../../../assets/images/woman_avatar.png";

type MessagePropsType = {
  name: string
  messageText: string
  messageTime: string
};

export const Message: React.FC<MessagePropsType> = (props) => {
  const messageClassName = `${styles.message} ${props.name === "Me" ? styles.outgoing : styles.incoming}`;
  const avatarSrc = props.name === "Me" ? manAvatar : womanAvatar;

  return (
    <div className={messageClassName}>
      <div className={styles.senderInfo}>
        <img className={styles.senderAvatar} src={avatarSrc} alt={props.name + " avatar"}/>
        <p className={styles.senderName}>{props.name}</p>
      </div>
      <div className={styles.messageContent}>
        <p className={styles.messageText}>{props.messageText}</p>
        <span className={styles.messageTime}>{props.messageTime}</span>
      </div>
    </div>
  );
};