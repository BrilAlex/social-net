import React, {ChangeEvent} from "react";
import styles from "./Dialogs.module.css";
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {DialogsPropsType} from "./DialogsContainer";
import {Redirect} from "react-router-dom";

export const Dialogs: React.FC<DialogsPropsType> = (props) => {

    const sendNewMessageHandler = () => {
        props.sendNewMessageCallback();
    }

    const updateNewMessageTextHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let newText = e.currentTarget.value;
        props.updateNewMessageTextCallback(newText);
    }

    let dialogsElements = props.dialogsData.map(dialog =>
        <DialogItem key={dialog.id} name={dialog.name} id={dialog.id}/>);

    let messagesElements = props.messagesData.map(message =>
        <Message key={message.id} id={message.id} messageText={message.messageText}/>);

    if(!props.isAuth) return <Redirect to={"/login"}/>;

    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={styles.messages}>
                <div>{messagesElements}</div>
                <div>
                    <textarea
                        value={props.newMessageText}
                        placeholder={"Type your message here"}
                        onChange={updateNewMessageTextHandler}
                    />
                    <button onClick={sendNewMessageHandler}>Send</button>
                </div>
            </div>
        </div>
    );
};