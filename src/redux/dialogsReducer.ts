import {ActionType, DialogsPageType, MessageType} from "./store";

export type UpdateNewMessageTextActionType = ReturnType<typeof updateNewMessageTextAC>;

export type SendMessageActionType = ReturnType<typeof sendMessageAC>;

export const UPDATE_NEW_MESSAGE_TEXT = "UPDATE-NEW-MESSAGE-TEXT";
export const SEND_MESSAGE = "SEND-MESSAGE";

export const updateNewMessageTextAC = (text: string) =>
  ({type: UPDATE_NEW_MESSAGE_TEXT, text} as const);

export const sendMessageAC = () => ({type: SEND_MESSAGE} as const);

export const dialogsReducer = (state: DialogsPageType, action: ActionType) => {
  switch (action.type) {
    case UPDATE_NEW_MESSAGE_TEXT:
      state.newMessageText = action.text;
      return state;
    case SEND_MESSAGE:
      const newMessage: MessageType = {
        id: state.messages.length + 1,
        sender: "Me",
        messageText: state.newMessageText,
        messageTime: "14.51"
      };
      state.messages.push(newMessage);
      state.newMessageText = "";
      return state;
    default:
      return state;
  }
};