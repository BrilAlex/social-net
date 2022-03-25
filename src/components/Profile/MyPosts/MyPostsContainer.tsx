import {MyPosts} from "./MyPosts";
import {addPostAC, ProfileInitStateType, updateNewPostTextAC} from "../../../redux/profileReducer";
import {connect} from "react-redux";
import {ActionType, AppStateType} from "../../../redux/reduxStore";

type MapStateToPropsType = ProfileInitStateType;

type MapDispatchToPropsType = {
  addPost: () => void
  updateNewPostText: (text: string) => void
};

export type MyPostsPropsType = MapStateToPropsType & MapDispatchToPropsType;

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText,
  };
};

const mapDispatchToProps = (dispatch: (action: ActionType) => void): MapDispatchToPropsType => {
  return {
    addPost: () => {
      dispatch(addPostAC());
    },
    updateNewPostText: (text: string) => {
      dispatch(updateNewPostTextAC(text));
    },
  };
};

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);