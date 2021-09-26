import {ActionTypes, DialogsPageType, MessageType} from "./state";

const SEND_NEW_MESSAGE = "SEND_NEW_MESSAGE";
const UPDATE_NEW_MESSAGE_TEXT = "UPDATE_NEW_MESSAGE_TEXT";

export const sendNewMessageActionCreator = () => ({type: SEND_NEW_MESSAGE} as const);
export const updateNewMessageTextActionCreator = (text: string) => (
    {type: UPDATE_NEW_MESSAGE_TEXT, newText: text} as const
);

const dialogsReducer = (state: DialogsPageType, action: ActionTypes) => {
    switch(action.type) {
        case SEND_NEW_MESSAGE:
            let newMessage: MessageType = {
                id: 6,
                messageText: state.newMessageText
            };
            state.messagesData.push(newMessage);
            state.newMessageText = "";
            return state;
        case UPDATE_NEW_MESSAGE_TEXT:
            state.newMessageText = action.newText;
            return state;
        default:
            return state;
    }
}

export default dialogsReducer;