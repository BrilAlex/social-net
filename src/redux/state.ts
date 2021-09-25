export type PostType = {
    id: number
    postText: string
    likesCounter: number
};

export type DialogType = {
    id: number
    name: string
};

export type MessageType = {
    id: number
    messageText: string
};

export type FriendType = {
    id: number
    name: string
    avatar: string
    avatarAlt: string
};

type ProfilePageType = {
    postsData: Array<PostType>
    newPostText: string
};

type DialogsPageType = {
    dialogsData: Array<DialogType>
    messagesData: Array<MessageType>
    newMessageText: string
};

export type SidebarType = {
    friendsList: Array<FriendType>
};

export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    sidebar: SidebarType
};

export type ActionType = {
    type: string
    newText?: string
}

type StoreType = {
    _state: RootStateType
    _callSubscriber: () => void
    getState: () => RootStateType
    subscribe: (observer: () => void) => void
    dispatch: (action: ActionType) => void
}

const ADD_NEW_POST = "ADD_NEW_POST";
const UPDATE_NEW_POST_TEXT = "UPDATE_NEW_POST_TEXT";
const SEND_NEW_MESSAGE = "SEND_NEW_MESSAGE";
const UPDATE_NEW_MESSAGE_TEXT = "UPDATE_NEW_MESSAGE_TEXT";

export const addNewPostActionCreator = (): ActionType => ({type: ADD_NEW_POST});
export const updateNewPostTextActionCreator = (text: string): ActionType => (
    {type: UPDATE_NEW_POST_TEXT, newText: text}
);
export const sendNewMessageActionCreator = (): ActionType => ({type: SEND_NEW_MESSAGE});
export const updateNeMessageTextActionCreator = (text: string): ActionType => ({
    type: UPDATE_NEW_MESSAGE_TEXT, newText: text
});

export let store: StoreType = {
    _state: {
        profilePage: {
            postsData: [
                {id: 1, postText: "Some text 1", likesCounter: 0},
                {id: 2, postText: "Some text 2", likesCounter: 15},
                {id: 3, postText: "Some text 3", likesCounter: 1},
                {id: 4, postText: "Some text 4", likesCounter: 10},
                {id: 5, postText: "Some text 5", likesCounter: 5}
            ],
            newPostText: "Type your post here"
        },
        dialogsPage: {
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
            newMessageText: "Type your message here"
        },
        sidebar: {
            friendsList: [
                {id: 1, name: "Dimych", avatar: "avatar", avatarAlt: "avatar Alt"},
                {id: 2, name: "Igor", avatar: "avatar", avatarAlt: "avatar Alt"},
                {id: 3, name: "Sveta", avatar: "avatar", avatarAlt: "avatar Alt"},
                {id: 4, name: "Sasha", avatar: "avatar", avatarAlt: "avatar Alt"},
                {id: 5, name: "Viktor", avatar: "avatar", avatarAlt: "avatar Alt"},
                {id: 6, name: "Valera", avatar: "avatar", avatarAlt: "avatar Alt"},
                {id: 7, name: "Alex", avatar: "avatar", avatarAlt: "avatar Alt"}
            ]
        }
    },
    _callSubscriber() {
        console.log("State changed");
    },
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    dispatch(action){
        switch(action.type) {
            case ADD_NEW_POST:
                let newPost: PostType = {
                    id: 6,
                    postText: this._state.profilePage.newPostText,
                    likesCounter: 0
                };
                this._state.profilePage.postsData.push(newPost);
                this._state.profilePage.newPostText = "";
                this._callSubscriber();
                break;
            case UPDATE_NEW_POST_TEXT:
                if(action.newText) this._state.profilePage.newPostText = action.newText;
                this._callSubscriber();
                break;
            case SEND_NEW_MESSAGE:
                let newMessage: MessageType = {
                    id: 6,
                    messageText: this._state.dialogsPage.newMessageText
                };
                this._state.dialogsPage.messagesData.push(newMessage);
                this._state.dialogsPage.newMessageText = "";
                this._callSubscriber();
                break;
            case UPDATE_NEW_MESSAGE_TEXT:
                if(action.newText) this._state.dialogsPage.newMessageText = action.newText;
                this._callSubscriber();
                break;
            default:
                throw new Error("Invalid action type");
        }
    }
};