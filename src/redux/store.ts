import manAvatar from "./../assets/images/man_avatar.png";
import womanAvatar from "./../assets/images/woman_avatar.png";

export type PostType = {
  id: number
  postText: string
  likesCount: number
};

type DialogType = {
  id: number
  name: string
};

type MessageType = {
  id: number
  sender: string
  messageText: string
  messageTime: string
};

type FriendType = {
  id: number
  name: string
  avatarSrc: string
};

export type ProfilePageType = {
  posts: Array<PostType>
  newPostText: string
};

export type DialogsPageType = {
  dialogs: Array<DialogType>
  messages: Array<MessageType>
  newMessageText: string
};

export type SidebarType = {
  friends: Array<FriendType>
};

export type RootStateType = {
  profilePage: ProfilePageType
  dialogsPage: DialogsPageType
  sidebar: SidebarType
};

export type RootStoreType = {
  _state: RootStateType
  _subscriber: (state: RootStateType) => void
  subscribe: (observer: (state: RootStateType) => void) => void
  getState: () => RootStateType
  dispatch: (action: ActionType) => void
};

type UpdateNewPostTextActionType = ReturnType<typeof updateNewPostTextAC>;

type AddPostActionType = ReturnType<typeof addPostAC>;

type UpdateNewMessageTextActionType = ReturnType<typeof updateNewMessageTextAC>;

type SendMessageActionType = ReturnType<typeof sendMessageAC>;

export type ActionType =
  AddPostActionType | UpdateNewPostTextActionType |
  UpdateNewMessageTextActionType | SendMessageActionType;

const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const ADD_POST = "ADD-POST";
const UPDATE_NEW_MESSAGE_TEXT = "UPDATE-NEW-MESSAGE-TEXT";
const SEND_MESSAGE = "SEND-MESSAGE";

export const updateNewPostTextAC = (text: string) => ({type: UPDATE_NEW_POST_TEXT, text} as const);

export const addPostAC = () => ({type: ADD_POST} as const);

export const updateNewMessageTextAC = (text: string) =>
  ({type: UPDATE_NEW_MESSAGE_TEXT, text} as const);

export const sendMessageAC = () => ({type: SEND_MESSAGE} as const);

export const store: RootStoreType = {
  _state: {
    profilePage: {
      posts: [
        {id: 1, postText: "It's my first post", likesCount: 20},
        {id: 2, postText: "Hi! How are you?", likesCount: 10},
      ],
      newPostText: "",
    },
    dialogsPage: {
      dialogs: [
        {id: 1, name: "Karina"},
        {id: 2, name: "Dimych"},
        {id: 3, name: "Sergei"},
        {id: 4, name: "Alexander"},
        {id: 5, name: "Svetlana"},
      ],
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
          messageText: "Fine, studying in IT-Incubator now. And you?",
          messageTime: "12:24",
        },
      ],
      newMessageText: "",
    },
    sidebar: {
      friends: [
        {id: 1, name: "Karina", avatarSrc: womanAvatar},
        {id: 2, name: "Dimych", avatarSrc: manAvatar},
        {id: 3, name: "Sergei", avatarSrc: manAvatar},
        {id: 4, name: "Alexander", avatarSrc: manAvatar},
        {id: 5, name: "Svetlana", avatarSrc: womanAvatar},
      ],
    }
  },
  _subscriber() {
    console.log("No subscribers (observers)");
  },
  subscribe(observer) {
    this._subscriber = observer;
  },
  getState() {
    return this._state;
  },
  dispatch(action) {
    switch (action.type) {
      case UPDATE_NEW_POST_TEXT:
        this._state.profilePage.newPostText = action.text;
        this._subscriber(this._state);
        break;
      case ADD_POST:
        const newPost: PostType = {
          id: this._state.profilePage.posts.length + 1,
          postText: this._state.profilePage.newPostText,
          likesCount: 0
        };
        this._state.profilePage.posts.push(newPost);
        this._state.profilePage.newPostText = "";
        this._subscriber(this._state);
        break;
      case UPDATE_NEW_MESSAGE_TEXT:
        this._state.dialogsPage.newMessageText = action.text;
        this._subscriber(this._state);
        break;
      case SEND_MESSAGE:
        const newMessage: MessageType = {
          id: this._state.dialogsPage.messages.length + 1,
          sender: "Me",
          messageText: this._state.dialogsPage.newMessageText,
          messageTime: "14.51"
        };
        this._state.dialogsPage.messages.push(newMessage);
        this._state.dialogsPage.newMessageText = "";
        this._subscriber(this._state);
        break;
    }
  },
};

// @ts-ignore
window.store = store;