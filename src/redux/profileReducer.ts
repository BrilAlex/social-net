import {ActionTypes, PostType, ProfilePageType} from "./state";

const ADD_NEW_POST = "ADD_NEW_POST";
const UPDATE_NEW_POST_TEXT = "UPDATE_NEW_POST_TEXT";

export const addNewPostActionCreator = () => ({type: ADD_NEW_POST} as const);
export const updateNewPostTextActionCreator = (text: string) => (
    {type: UPDATE_NEW_POST_TEXT, newText: text} as const
);

const profileReducer = (state: ProfilePageType, action: ActionTypes) => {
    switch(action.type) {
        case ADD_NEW_POST:
            let newPost: PostType = {
                id: 6,
                postText: state.newPostText,
                likesCounter: 0
            };
            state.postsData.push(newPost);
            state.newPostText = "";
            return state;
        case UPDATE_NEW_POST_TEXT:
            state.newPostText = action.newText;
            return state;
        default:
            return state;
    }
}

export default profileReducer;