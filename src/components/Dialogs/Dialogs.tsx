import React, {ChangeEvent} from "react";
import styles from "./Dialogs.module.css";
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {ActionType, DialogType, MessageType, SEND_NEW_MESSAGE, UPDATE_NEW_MESSAGE_TEXT} from "../../redux/state";

type DialogsProps = {
    dialogsData: Array<DialogType>
    messagesData: Array<MessageType>
    newMessageText: string
    dispatchCallback: (action: ActionType) => void
}

export const Dialogs: React.FC<DialogsProps> = (props) => {

    const sendNewMessageHandler = () => {
        props.dispatchCallback({type: SEND_NEW_MESSAGE})
        //props.sendNewMessageCallback();
    };

    const updateNewMessageTextHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let newText = e.currentTarget.value;
        const action = {type: UPDATE_NEW_MESSAGE_TEXT, newText};
        props.dispatchCallback(action);
        //props.updateNewMessageTextCallback(newText);
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