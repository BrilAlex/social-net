import React from "react";
import {sendNewMessageAC, updateNewMessageTextAC} from "../../redux/dialogsReducer";
import {Dialogs} from "./Dialogs";
import {StoreContext} from "../../StoreContext";

type DialogsContainerProps = {};

export const DialogsContainer = (props: DialogsContainerProps) => {
    return (
        <StoreContext.Consumer>
            {
                store => {
                    let state = store.getState();
                    let dialogsData = state.dialogsPage.dialogsData;
                    let messagesData = state.dialogsPage.messagesData;
                    let newMessageText = state.dialogsPage.newMessageText;

                    const sendNewMessage = () => {
                        store.dispatch(sendNewMessageAC());
                    }

                    const updateNewMessageText = (newText: string) => {
                        const action = updateNewMessageTextAC(newText);
                        store.dispatch(action);
                    }
                    return <Dialogs
                        dialogsData={dialogsData}
                        messagesData={messagesData}
                        newMessageText={newMessageText}
                        sendNewMessageCallback={sendNewMessage}
                        updateNewMessageTextCallback={updateNewMessageText}
                    />
                }
            }
        </StoreContext.Consumer>
    );
};