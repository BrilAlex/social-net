import React from "react";
import styles from "./Dialogs.module.css";
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {DialogsPageType} from "../../redux/state";

type DialogsPropsType = {
  state: DialogsPageType
};

export const Dialogs: React.FC<DialogsPropsType> = (props) => {
  const dialogsElements = props.state.dialogs.map(d =>
    <DialogItem key={d.id} id={d.id} name={d.name}/>
  );

  const messagesElements = props.state.messages.map(m =>
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