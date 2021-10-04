import React from "react";
import {RootStoreType} from "../../redux/reduxStore";
import {sendNewMessageAC, updateNewMessageTextAC} from "../../redux/dialogsReducer";
import {Dialogs} from "./Dialogs";

type DialogsContainerProps = {
    store: RootStoreType
}

export const DialogsContainer = (props: DialogsContainerProps) => {
    let state = props.store.getState();
    let dialogsData = state.dialogsPage.dialogsData;
    let messagesData = state.dialogsPage.messagesData;
    let newMessageText = state.dialogsPage.newMessageText;

    const sendNewMessage = () => {
        props.store.dispatch(sendNewMessageAC());
    }

    const updateNewMessageText = (newText: string) => {
        const action = updateNewMessageTextAC(newText);
        props.store.dispatch(action);
    }

    return <Dialogs
        dialogsData={dialogsData}
        messagesData={messagesData}
        newMessageText={newMessageText}
        sendNewMessageCallback={sendNewMessage}
        updateNewMessageTextCallback={updateNewMessageText}
    />;
};