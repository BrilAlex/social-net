import {DialogsInitStateType, dialogsReducer, sendNewMessageAC} from "./dialogsReducer";

let state: DialogsInitStateType;

beforeEach(() => {
  state = {
    dialogs: [
      {id: 1, name: "User1"},
      {id: 2, name: "User2"},
    ],
    messages: [
      {id: 1, sender: "Me", messageText: "Hi!", messageTime: "12:05"},
      {id: 2, sender: "User", messageText: "Yo! How are you?", messageTime: "12:18"},
    ],
  };
});

test("New message should be immutably added", () => {
  const newMessageText = "Hello world!";
  const action = sendNewMessageAC(newMessageText);

  const newState = dialogsReducer(state, action);

  expect(newState).not.toBe(state);
  expect(newState.messages.length).toBe(3);
  expect(newState.messages[2].id).toBe(3);
  expect(newState.messages[2].messageText).toBe(newMessageText);
});