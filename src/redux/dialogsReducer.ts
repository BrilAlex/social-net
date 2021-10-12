import {ActionTypes} from "./reduxStore";

export type DialogType = {
    id: number
    name: string
};

export type MessageType = {
    id: number
    messageText: string
};

export type DialogsPageType = {
    dialogsData: Array<DialogType>
    messagesData: Array<MessageType>
    newMessageText: string
};

let initialState: DialogsPageType = {
    dialogsData: [
        {id: 1, name: "Dimych"},
        {id: 2, name: "Andrey"},
        {id: 3, name: "Sveta"},
        {id: 4, name: "Sasha"},
        {id: 5, name: "Viktor"},
        {id: 6, name: "Valera"},
        {id: 7, name: "Alex"}
    ],
    messagesData: [
        {id: 1, messageText: "Hi!"},
        {id: 2, messageText: "How is your it-kamasutra"},
        {id: 3, messageText: "Yo!"},
        {id: 4, messageText: "Yo?"},
        {id: 5, messageText: "What's up?"}
    ],
    newMessageText: ""
};

export type DialogsActionTypes =
    ReturnType<typeof sendNewMessageAC> | ReturnType<typeof updateNewMessageTextAC>;

const SEND_NEW_MESSAGE = "SEND_NEW_MESSAGE";
const UPDATE_NEW_MESSAGE_TEXT = "UPDATE_NEW_MESSAGE_TEXT";

export const sendNewMessageAC = () => ({type: SEND_NEW_MESSAGE} as const);
export const updateNewMessageTextAC = (text: string) => (
    {type: UPDATE_NEW_MESSAGE_TEXT, newText: text} as const
);

const dialogsReducer = (state = initialState, action: ActionTypes): DialogsPageType => {
    switch(action.type) {
        case SEND_NEW_MESSAGE:
            let newMessage: MessageType = {
                id: 6,
                messageText: state.newMessageText
            };
            return {...state, messagesData: [...state.messagesData, newMessage], newMessageText: ""};
        case UPDATE_NEW_MESSAGE_TEXT:
            return {...state, newMessageText: action.newText};
        default:
            return state;
    }
}

export default dialogsReducer;