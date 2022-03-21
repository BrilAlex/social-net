import {RootStoreType} from "../../redux/reduxStore";
import {Dialogs} from "./Dialogs";
import {sendMessageAC, updateNewMessageTextAC} from "../../redux/dialogsReducer";

type DialogsContainerPropsType = {
  store: RootStoreType
}

export const DialogsContainer = (props: DialogsContainerPropsType) => {
  const state = props.store.getState().dialogsPage;

  const updateNewMessageText = (text: string) => {
    props.store.dispatch(updateNewMessageTextAC(text));
  };

  const sendMessage = () => {
    props.store.dispatch(sendMessageAC());
  };

  return (
    <Dialogs
      state={state}
      sendMessage={sendMessage}
      updateNewMessageText={updateNewMessageText}
    />
  );
};