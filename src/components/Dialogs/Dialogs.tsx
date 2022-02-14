import React from "react";
import styles from "./Dialogs.module.css";
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";

type DialogsType = {
  id: number
  name: string
};

type MessageType = {
  id: number
  sender: string
  messageText: string
  messageTime: string
}

export const Dialogs = () => {
  const dialogs: Array<DialogsType> = [
    {id: 1, name: "Karina"},
    {id: 2, name: "Dimych"},
    {id: 3, name: "Sergei"},
    {id: 4, name: "Alexander"},
    {id: 5, name: "Svetlana"},
  ];

  const messages: Array<MessageType> = [
    {
      id: 1,
      sender: "Me",
      messageText: "Hi!",
      messageTime: "12:05"
    },
    {
      id: 2,
      sender: "User",
      messageText: "Yo! How are you?",
      messageTime: "12:18"
    },
    {
      id: 3,
      sender: "Me",
      messageText: "Fine, studying in IT-Incubator now. And you?",
      messageTime: "12:24"
    },
  ];

  const dialogsElements = dialogs.map(d => <DialogItem key={d.id} id={d.id} name={d.name}/>);

  const messagesElements = messages.map(m =>
    <Message
      key={m.id}
      name={m.sender}
      messageText={m.messageText}
      messageTime={m.messageTime}
    />
  );

  return (
    <div className={styles.dialogsPage}>
      <div className={styles.dialogsContainer}>
        {dialogsElements}
      </div>
      <div className={styles.messagesContainer}>
        {messagesElements}
      </div>
    </div>
  );
};