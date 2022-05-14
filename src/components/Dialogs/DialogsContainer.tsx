import {Dialogs} from "./Dialogs";
import {DialogsInitStateType, sendNewMessageAC} from "../../redux/dialogsReducer";
import {connect} from "react-redux";
import {AppActionsType, AppStateType} from "../../redux/reduxStore";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {ComponentType} from "react";

type MapStateToPropsType = DialogsInitStateType;

type MapDispatchToPropsType = {
  sendNewMessage: (newMessageText: string) => void
};

export type DialogsPropsType = MapStateToPropsType & MapDispatchToPropsType;

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    dialogs: state.dialogsPage.dialogs,
    messages: state.dialogsPage.messages,
  };
};

const mapDispatchToProps = (dispatch: (action: AppActionsType) => void): MapDispatchToPropsType => {
  return {
    sendNewMessage: (newMessageText: string) => {
      dispatch(sendNewMessageAC(newMessageText));
    },
  };
};

export const DialogsContainer = compose<ComponentType>(
  withAuthRedirect,
  connect(mapStateToProps, mapDispatchToProps),
)(Dialogs);