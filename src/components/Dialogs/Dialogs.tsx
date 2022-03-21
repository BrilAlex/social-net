import React, {ChangeEvent} from "react";
import styles from "./Dialogs.module.css";
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {DialogsPageType} from "../../redux/dialogsReducer";

type DialogsPropsType = {
  state: DialogsPageType
  sendMessage: () => void
  updateNewMessageText: (text: string) => void
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

  const sendMessage = () => {
    if (props.state.newMessageText !== "") {
      props.sendMessage();
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
        <div>{messagesElements}</div>
        <div className={styles.newMessageBlock}>
          <textarea
            value={props.state.newMessageText}
            onChange={onChangeNewMessageText}
            placeholder={"Enter your message"}
          />
          <button onClick={sendMessage}>Send message</button>
        </div>
      </div>
    </div>
  );
};