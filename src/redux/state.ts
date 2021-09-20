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
type StoreType = {
    _state: RootStateType
    getState: () => RootStateType
    addNewPost: () => void
    updateNewPostText: (newPostText: string) => void
    sendNewMessage: () => void
    updateNewMessageText: (newMessageText: string) => void
    _callSubscriber: () => void
    subscribe: (observer: () => void) => void
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
    getState() {
        return this._state;
    },
    _callSubscriber() {
        console.log("State changed");
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    addNewPost() {
        let newPost: PostType = {
            id: 6,
            postText: this._state.profilePage.newPostText,
            likesCounter: 0
        };
        this._state.profilePage.postsData.push(newPost);
        this._state.profilePage.newPostText = "";
        this._callSubscriber();
    },
    updateNewPostText(newPostText) {
        this._state.profilePage.newPostText = newPostText;
        this._callSubscriber();
    },
    sendNewMessage() {
        let newMessage: MessageType = {
            id: 6,
            messageText: this._state.dialogsPage.newMessageText
        };
        this._state.dialogsPage.messagesData.push(newMessage);
        this._state.dialogsPage.newMessageText = "";
        this._callSubscriber();
    },
    updateNewMessageText(newMessageText) {
        this._state.dialogsPage.newMessageText = newMessageText;
        this._callSubscriber();
    }
};