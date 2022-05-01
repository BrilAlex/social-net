import {Dialogs} from "./Dialogs";
import {
  DialogsInitStateType,
  sendMessageAC,
  updateNewMessageTextAC
} from "../../redux/dialogsReducer";
import {connect} from "react-redux";
import {AppActionType, AppStateType} from "../../redux/reduxStore";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

type MapStateToPropsType = DialogsInitStateType;

type MapDispatchToPropsType = {
  sendMessage: () => void
  updateNewMessageText: (text: string) => void
};

export type DialogsPropsType = MapStateToPropsType & MapDispatchToPropsType;

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    dialogs: state.dialogsPage.dialogs,
    messages: state.dialogsPage.messages,
    newMessageText: state.dialogsPage.newMessageText,
  };
};

const mapDispatchToProps = (dispatch: (action: AppActionType) => void): MapDispatchToPropsType => {
  return {
    sendMessage: () => {
      dispatch(sendMessageAC());
    },
    updateNewMessageText: (text: string) => {
      dispatch(updateNewMessageTextAC(text));
    },
  };
};

const AuthRedirectContainer = withAuthRedirect(Dialogs);

export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectContainer);