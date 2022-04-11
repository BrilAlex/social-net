import {
  addPostAC,
  ProfileInitStateType,
  profileReducer, ProfileType, setUserProfile,
  updateNewPostTextAC
} from "./profileReducer";

let state: ProfileInitStateType;

beforeEach(() => {
  state = {
    profile: {} as ProfileType,
    posts: [
      {id: 1, postText: "It's my first post", likesCount: 20},
      {id: 2, postText: "Hi! How are you?", likesCount: 10},
    ],
    newPostText: "",
  };
});

test("New post text should be immutably updated", () => {
  const newText = "Hello world!";
  const action = updateNewPostTextAC(newText);

  const newState = profileReducer(state, action);

  expect(newState).not.toBe(state);
  expect(newState.newPostText).toBe(newText);
});

test("New post should be immutably added", () => {
  const newPostText = "Hello world!";
  state.newPostText = newPostText;
  const action = addPostAC();

  const newState = profileReducer(state, action);

  expect(newState).not.toBe(state);
  expect(newState.posts.length).toBe(3);
  expect(newState.posts[2].id).toBe(3);
  expect(newState.posts[2].postText).toBe(newPostText);
  expect(newState.newPostText).toBe("");
});

test("Profile data should be immutably added to state", () => {
  const profileData = {
    userId: 1,
    lookingForAJob: true,
    lookingForAJobDescription: "",
    fullName: "User",
    contacts: {
      github: "",
    },
    photos: {
      small: "",
      large: "",
    },
  };
  const action = setUserProfile(profileData);

  const newState = profileReducer(state, action);

  expect(newState).not.toBe(state);
  expect(newState.profile).toEqual(profileData);
});