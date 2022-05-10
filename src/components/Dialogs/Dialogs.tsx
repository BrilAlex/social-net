import React from "react";
import styles from "./Dialogs.module.css";
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {DialogsPropsType} from "./DialogsContainer";
import SendNewMessageForm, {SendNewMessageFormDataType} from "./SendNewMessageForm/SendNewMessageForm";

export const Dialogs: React.FC<DialogsPropsType> = (props) => {
  const dialogsElements = props.dialogs.map(d =>
    <DialogItem key={d.id} id={d.id} name={d.name}/>
  );

  const messagesElements = props.messages.map(m =>
    <Message
      key={m.id}
      name={m.sender}
      messageText={m.messageText}
      messageTime={m.messageTime}
    />
  );

  const sendNewMessage = (formData: SendNewMessageFormDataType) => {
    props.sendNewMessage(formData.newMessageText);
  };

  return (
    <div className={styles.dialogsPage}>
      <div className={styles.dialogsContainer}>
        {dialogsElements}
      </div>
      <div className={styles.messagesContainer}>
        <div>{messagesElements}</div>
        <div className={styles.newMessageBlock}>
          <SendNewMessageForm onSubmit={sendNewMessage}/>
        </div>
      </div>
    </div>
  );
};