import {Dialogs} from "./Dialogs";
import {DialogsInitStateType, sendNewMessageAC} from "../../redux/dialogsReducer";
import {connect} from "react-redux";
import {RootActionsType, AppStateType} from "../../redux/reduxStore";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {ComponentType} from "react";
import {getDialogs, getMessages} from "../../redux/dialogsSelectors";

type MapStateToPropsType = DialogsInitStateType;

type MapDispatchToPropsType = {
  sendNewMessage: (newMessageText: string) => void
};

export type DialogsPropsType = MapStateToPropsType & MapDispatchToPropsType;

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    dialogs: getDialogs(state),
    messages: getMessages(state),
  };
};

const mapDispatchToProps = (dispatch: (action: RootActionsType) => void): MapDispatchToPropsType => {
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