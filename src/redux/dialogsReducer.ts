import {ActionType} from "./reduxStore";

export type DialogType = {
  id: number
  name: string
};

export type MessageType = {
  id: number
  sender: string
  messageText: string
  messageTime: string
};

export type DialogsInitStateType = typeof initialState;

export type DialogsActionType =
  ReturnType<typeof sendMessageAC> | ReturnType<typeof updateNewMessageTextAC>;

const initialState = {
  dialogs: [
    {id: 1, name: "Karina"},
    {id: 2, name: "Dimych"},
    {id: 3, name: "Sergei"},
    {id: 4, name: "Alexander"},
    {id: 5, name: "Svetlana"},
  ] as Array<DialogType>,
  messages: [
    {
      id: 1,
      sender: "Me",
      messageText: "Hi!",
      messageTime: "12:05",
    },
    {
      id: 2,
      sender: "User",
      messageText: "Yo! How are you?",
      messageTime: "12:18",
    },
    {
      id: 3,
      sender: "Me",
      messageText: "Fine, studying in IT-Incubator now. And how are you?",
      messageTime: "12:24",
    },
  ] as Array<MessageType>,
  newMessageText: "",
};

export const UPDATE_NEW_MESSAGE_TEXT = "UPDATE-NEW-MESSAGE-TEXT";
export const SEND_MESSAGE = "SEND-MESSAGE";

export const updateNewMessageTextAC = (text: string) =>
  ({type: UPDATE_NEW_MESSAGE_TEXT, text} as const);

export const sendMessageAC = () => ({type: SEND_MESSAGE} as const);

export const dialogsReducer = (state = initialState, action: ActionType): DialogsInitStateType => {
  switch (action.type) {
    case UPDATE_NEW_MESSAGE_TEXT: {
      return {
        ...state,
        newMessageText: action.text,
      };
    }
    case SEND_MESSAGE: {
      const newMessage: MessageType = {
        id: state.messages.length + 1,
        sender: "Me",
        messageText: state.newMessageText,
        messageTime: "14.51"
      };

      return {
        ...state,
        messages: [...state.messages, newMessage],
        newMessageText: "",
      };
    }
    default:
      return state;
  }
};