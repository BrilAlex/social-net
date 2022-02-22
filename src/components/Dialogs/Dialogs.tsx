import React, {ChangeEvent} from "react";
import styles from "./Dialogs.module.css";
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {DialogsPageType} from "../../redux/state";

type DialogsPropsType = {
  dialogsPage: DialogsPageType
  updateNewMessageText: (text: string) => void
  addMessage: () => void
};

export const Dialogs: React.FC<DialogsPropsType> = (props) => {
  const dialogsElements = props.dialogsPage.dialogs.map(d =>
    <DialogItem key={d.id} id={d.id} name={d.name}/>
  );

  const messagesElements = props.dialogsPage.messages.map(m =>
    <Message
      key={m.id}
      name={m.sender}
      messageText={m.messageText}
      messageTime={m.messageTime}
    />
  );

  const sendMessage = () => {
    if(props.dialogsPage.newMessageText !== "") {
      props.addMessage();
    }
  };

  const onChangeNewMessageText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    props.updateNewMessageText(e.currentTarget.value);
  };

  return (
    <div className={styles.dialogsPage}>
      <div className={styles.dialogsContainer}>
        {dialogsElements}
      </div>
      <div className={styles.messagesContainer}>
        {messagesElements}
        <div className={styles.newMessageBlock}>
          <textarea value={props.dialogsPage.newMessageText} onChange={onChangeNewMessageText}/>
          <button onClick={sendMessage}>Send message</button>
        </div>
      </div>
    </div>
  );
};