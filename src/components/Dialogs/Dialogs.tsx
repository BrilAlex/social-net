import React from "react";
import styles from "./Dialogs.module.css";
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {DialogType, MessageType} from "../../index";

type DialogsPropsType = {
  dialogs: Array<DialogType>
  messages: Array<MessageType>
};

export const Dialogs = (props: DialogsPropsType) => {
  const dialogsElements = props.dialogs.map(d => <DialogItem key={d.id} id={d.id} name={d.name}/>);

  const messagesElements = props.messages.map(m =>
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