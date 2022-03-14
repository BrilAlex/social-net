import {ActionType, PostType, ProfilePageType} from "./store";

export type UpdateNewPostTextActionType = ReturnType<typeof updateNewPostTextAC>;

export type AddPostActionType = ReturnType<typeof addPostAC>;

export const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
export const ADD_POST = "ADD-POST";

export const updateNewPostTextAC = (text: string) => ({type: UPDATE_NEW_POST_TEXT, text} as const);

export const addPostAC = () => ({type: ADD_POST} as const);

export const profileReducer = (state: ProfilePageType, action: ActionType) => {
  switch (action.type) {
    case UPDATE_NEW_POST_TEXT:
      state.newPostText = action.text;
      return state;
    case ADD_POST:
      const newPost: PostType = {
        id: state.posts.length + 1,
        postText: state.newPostText,
        likesCount: 0
      };
      state.posts.push(newPost);
      state.newPostText = "";
      return state;
    default:
      return state;
  }
};