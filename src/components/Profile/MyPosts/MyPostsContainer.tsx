import {RootStoreType} from "../../../redux/reduxStore";
import {MyPosts} from "./MyPosts";
import {addPostAC, updateNewPostTextAC} from "../../../redux/profileReducer";

type MyPostsContainerPropsType = {
  store: RootStoreType
};

export const MyPostsContainer = (props: MyPostsContainerPropsType) => {
  const state = props.store.getState().profilePage;

  const updateNewPostText = (text: string) => {
    props.store.dispatch(updateNewPostTextAC(text));
  };

  const addPost = () => {
    props.store.dispatch(addPostAC());
  };

  return (
    <MyPosts
      posts={state.posts}
      newPostText={state.newPostText}
      addPost={addPost}
      updateNewPostText={updateNewPostText}
    />
  );
};