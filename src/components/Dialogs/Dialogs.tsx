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
        <img className={styles.senderAvatar} src={props.avatarImg} alt={props.name + " avatar"}/>
        <p className={styles.senderName}>{props.name}</p>
      </div>
      <div className={styles.messageContent}>
        <p className={styles.messageText}>{props.messageText}</p>
        <span className={styles.messageTime}>{props.messageTime}</span>
      </div>
    </div>
  );
};

export const Dialogs = (props: DialogsPropsType) => {
  const dialogsData = [
    {id: 1, name: "Karina"},
    {id: 2, name: "Dimych"},
    {id: 3, name: "Sergei"},
    {id: 4, name: "Alexander"},
    {id: 5, name: "Svetlana"},
  ];

  const messagesData = [
    {id: 1, name: "Me", avatarImg: "", messageText: "Hi!", messageTime: "12:05"},
    {id: 1, name: "User", avatarImg: "", messageText: "Yo! How are you?", messageTime: "12:18"},
    {id: 1, name: "Me", avatarImg: "", messageText: "Fine, studying in IT-Incubator now. And you?", messageTime: "12:24"},
  ];

  return (
    <div className={styles.dialogsPage}>
      <div className={styles.dialogsContainer}>
        <DialogItem id={dialogsData[0].id} name={dialogsData[0].name}/>
        <DialogItem id={dialogsData[1].id} name={dialogsData[1].name}/>
      </div>
      <div className={styles.messagesContainer}>
        <Message
          name={messagesData[0].name}
          avatarImg={messagesData[0].avatarImg}
          messageText={messagesData[0].messageText}
          messageTime={messagesData[0].messageTime}
        />
        <Message
          name={messagesData[1].name}
          avatarImg={messagesData[1].avatarImg}
          messageText={messagesData[1].messageText}
          messageTime={messagesData[1].messageTime}
        />
      </div>
    </div>
  );
};