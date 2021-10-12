import {ActionTypes} from "./reduxStore";

export type PostType = {
    id: number
    postText: string
    likesCounter: number
};

export type ProfilePageType = {
    postsData: Array<PostType>
    newPostText: string
};

export type ProfileActionTypes =
    ReturnType<typeof addNewPostAC> | ReturnType<typeof updateNewPostTextAC>;

let initialState: ProfilePageType = {
    postsData: [
        {id: 1, postText: "Some text 1", likesCounter: 0},
        {id: 2, postText: "Some text 2", likesCounter: 15},
        {id: 3, postText: "Some text 3", likesCounter: 1},
        {id: 4, postText: "Some text 4", likesCounter: 10},
        {id: 5, postText: "Some text 5", likesCounter: 5}
    ],
    newPostText: ""
};

const ADD_NEW_POST = "ADD_NEW_POST";
const UPDATE_NEW_POST_TEXT = "UPDATE_NEW_POST_TEXT";

export const addNewPostAC = () => ({type: ADD_NEW_POST} as const);
export const updateNewPostTextAC = (text: string) => (
    {type: UPDATE_NEW_POST_TEXT, newText: text} as const
);

const profileReducer = (state = initialState, action: ActionTypes): ProfilePageType => {
    switch(action.type) {
        case ADD_NEW_POST:
            let newPost: PostType = {
                id: 6,
                postText: state.newPostText,
                likesCounter: 0
            };
            return {...state, postsData: [...state.postsData, newPost], newPostText: ""};
        case UPDATE_NEW_POST_TEXT:
            return {...state, newPostText: action.newText};
        default:
            return state;
    }
}

export default profileReducer;