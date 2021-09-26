import profileReducer, {
    addNewPostActionCreator,
    updateNewPostTextActionCreator
} from "./profileReducer";
import dialogsReducer, {
    sendNewMessageActionCreator,
    updateNewMessageTextActionCreator
} from "./dialogsReducer";

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

export type ProfilePageType = {
    postsData: Array<PostType>
    newPostText: string
};

export type DialogsPageType = {
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

export type ActionTypes =
    ReturnType<typeof addNewPostActionCreator>
    | ReturnType<typeof updateNewPostTextActionCreator>
    | ReturnType<typeof sendNewMessageActionCreator>
    | ReturnType<typeof updateNewMessageTextActionCreator>;

type StoreType = {
    _state: RootStateType
    _callSubscriber: () => void
    getState: () => RootStateType
    subscribe: (observer: () => void) => void
    dispatch: (action: ActionTypes) => void
}

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
            newPostText: ""
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
            newMessageText: ""
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
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._callSubscriber();
    }
};