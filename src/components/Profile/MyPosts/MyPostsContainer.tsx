import {MyPosts} from "./MyPosts";
import {addPostAC, updateNewPostTextAC} from "../../../redux/profileReducer";
import {StoreContext} from "../../../StoreContext";

export const MyPostsContainer = () => {
  return (
    <StoreContext.Consumer>
      {
        (store) => {
          const state = store.getState().profilePage;

          const updateNewPostText = (text: string) => {
            store.dispatch(updateNewPostTextAC(text));
          };

          const addPost = () => {
            store.dispatch(addPostAC());
          };
          return <MyPosts
            posts={state.posts}
            newPostText={state.newPostText}
            addPost={addPost}
            updateNewPostText={updateNewPostText}
          />
        }
      }
    </StoreContext.Consumer>
  );
};