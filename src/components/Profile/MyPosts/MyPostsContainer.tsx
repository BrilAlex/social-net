import {MyPosts} from "./MyPosts";
import {addPostAC, PostType, updateNewPostTextAC} from "../../../redux/profileReducer";
import {connect} from "react-redux";
import {AppActionType, AppStateType} from "../../../redux/reduxStore";

type MapStateToPropsType = {
  posts: Array<PostType>
  newPostText: string
};

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

const mapDispatchToProps = (dispatch: (action: AppActionType) => void): MapDispatchToPropsType => {
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