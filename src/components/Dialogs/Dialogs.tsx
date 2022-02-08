import React from "react";
import styles from "./Dialogs.module.css";
import {NavLink} from "react-router-dom";

type DialogItemPropsType = {
  id: number
  name: string
};

type MessagePropsType = {
  name: string
  avatarImg: string
  messageText: string
  messageTime: string
};

type DialogsPropsType = {};

export const Dialogs = (props: DialogsPropsType) => {
  const getNavLinkClassName = (navData: {isActive: boolean}) => {
    return navData.isActive ? styles.active : "";
  };

  const DialogItem = (props: DialogItemPropsType) => {
    const path = "/dialogs/" + props.id;

    return (
      <div className={styles.dialog}>
        <NavLink to={path} className={(navData) => getNavLinkClassName(navData)}>
          {props.name}
        </NavLink>
      </div>
    );
  };

  const Message = (props: MessagePropsType) => {
    return (
      <div className={styles.message}>
        <div className={styles.senderInfo}>
          <img className={styles.senderAvatar} src={props.avatarImg} alt={props.name + "avatar"}/>
          <p className={styles.senderName}>{props.name}</p>
        </div>
        <div className={styles.messageContent}>
          <p className={styles.messageText}>{props.messageText}</p>
          <span className={styles.messageTime}>{props.messageTime}</span>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.dialogsPage}>
      <div className={styles.dialogsContainer}>
        <DialogItem id={1} name={"Karina"}/>
        <DialogItem id={2} name={"Dimych"}/>
        <DialogItem id={3} name={"Sergei"}/>
        <DialogItem id={4} name={"Alexander"}/>
        <DialogItem id={5} name={"Svetlana"}/>
      </div>
      <div className={styles.messagesContainer}>
        <Message
          name={"Me"}
          avatarImg={""}
          messageText={"Hi!"}
          messageTime={"12:05"}
        />
        <Message
          name={"User"}
          avatarImg={""}
          messageText={"Yo! How are you?"}
          messageTime={"12:18"}
        />
        <Message
          name={"Me"}
          avatarImg={""}
          messageText={"Fine, studying in IT-Incubator now. And you?"}
          messageTime={"12:24"}
        />
      </div>
    </div>
  );
};