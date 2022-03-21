import {Dialogs} from "./Dialogs";
import {sendMessageAC, updateNewMessageTextAC} from "../../redux/dialogsReducer";
import {StoreContext} from "../StoreContext";

export const DialogsContainer = () => {
  return (
    <StoreContext.Consumer>
      {
        (store) => {
          const state = store.getState().dialogsPage;

          const updateNewMessageText = (text: string) => {
            store.dispatch(updateNewMessageTextAC(text));
          };

          const sendMessage = () => {
            store.dispatch(sendMessageAC());
          };

          return <Dialogs
            state={state}
            sendMessage={sendMessage}
            updateNewMessageText={updateNewMessageText}
          />
        }
      }
    </StoreContext.Consumer>
  );
};