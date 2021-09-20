import React, {ChangeEvent} from "react";
import styles from "./Dialogs.module.css";
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {DialogType, MessageType} from "../../redux/state";

type DialogsProps = {
    dialogsData: Array<DialogType>
    messagesData: Array<MessageType>
    newMessageText: string
    sendNewMessageCallback: () => void
    updateNewMessageTextCallback: (newMessageText: string) => void
}

export const Dialogs: React.FC<DialogsProps> = (props) => {
    let newMessageTextAreaRef = React.createRef<HTMLTextAreaElement>();

    const sendNewMessageHandler = () => {
        props.sendNewMessageCallback();
    };

    const updateNewMessageTextHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let newText = e.currentTarget.value;
        props.updateNewMessageTextCallback(newText);
    };

    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogsItems}>
                {props.dialogsData.map(dialog => <DialogItem key={dialog.id} name={dialog.name} id={dialog.id}/>)}
            </div>
            <div className={styles.messages}>
                {props.messagesData.map(message => <Message key={message.id} id={message.id} messageText={message.messageText}/>)}
                <div>
                    <textarea
                        onChange={updateNewMessageTextHandler}
                        value={props.newMessageText}
                    />
                    <button onClick={sendNewMessageHandler}>Send</button>
                </div>
            </div>
        </div>
    );
};