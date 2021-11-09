import React from "react";
import {
    DialogsActionTypes,
    DialogsPageType,
    sendNewMessageAC,
    updateNewMessageTextAC
} from "../../redux/dialogsReducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {RootStateType} from "../../redux/reduxStore";

type MapStateToPropsType = DialogsPageType & {isAuth: boolean};
type MapDispatchToPropsType = {
    sendNewMessageCallback: () => void
    updateNewMessageTextCallback: (newText: string) => void
};
export type DialogsPropsType = MapStateToPropsType & MapDispatchToPropsType;

const mapStateToProps = (state: RootStateType): MapStateToPropsType => {
    return {
        dialogsData: state.dialogsPage.dialogsData,
        messagesData: state.dialogsPage.messagesData,
        newMessageText: state.dialogsPage.newMessageText,
        isAuth: state.auth.isAuth,
    }
};

const mapDispatchToProps =
    (dispatch: (action: DialogsActionTypes) => void): MapDispatchToPropsType => {
    return {
        sendNewMessageCallback: () => dispatch(sendNewMessageAC()),
        updateNewMessageTextCallback: (newText: string) =>
            dispatch(updateNewMessageTextAC(newText))
    }
};

export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);