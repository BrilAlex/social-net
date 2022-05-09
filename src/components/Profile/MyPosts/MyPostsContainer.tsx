import {MyPosts} from "./MyPosts";
import {addNewPostAC, PostType} from "../../../redux/profileReducer";
import {connect} from "react-redux";
import {AppActionType, AppStateType} from "../../../redux/reduxStore";

type MapStateToPropsType = {
  posts: Array<PostType>
};

type MapDispatchToPropsType = {
  addNewPost: (newPostText: string) => void
};

export type MyPostsPropsType = MapStateToPropsType & MapDispatchToPropsType;

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    posts: state.profilePage.posts,
  };
};

const mapDispatchToProps = (dispatch: (action: AppActionType) => void): MapDispatchToPropsType => {
  return {
    addNewPost: (newPostText: string) => {
      dispatch(addNewPostAC(newPostText));
    },
  };
};

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);