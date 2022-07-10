import {
  addNewPostAC, deletePostAC,
  ProfileInitStateType,
  profileReducer, setUserProfile, setUserStatus
} from "./profileReducer";
import {ProfileType} from "../api/profileApi";

let state: ProfileInitStateType;

beforeEach(() => {
  state = {
    profile: {} as ProfileType,
    posts: [
      {id: 1, postText: "It's my first post", likesCount: 20},
      {id: 2, postText: "Hi! How are you?", likesCount: 10},
    ],
    status: "",
  };
});

it("New post should be immutably added to state", () => {
  // 1. test data
  const newPostText = "Hello world!";
  const action = addNewPostAC(newPostText);

  // 2. action
  const newState = profileReducer(state, action);

  // 3. expectation
  expect(newState).not.toBe(state);
  expect(newState.posts.length).toBe(3);
  expect(newState.posts[2].id).toBe(3);
  expect(newState.posts[2].postText).toBe(newPostText);
  expect(newState.posts[2].likesCount).toBe(0);
});

it("Post with corresponding ID should be deleted from state", () => {
  // 1. test data
  const post_ID = 1;
  const action = deletePostAC(post_ID);

  // 2. action
  const newState = profileReducer(state, action);

  // 3. expectation
  expect(newState).not.toBe(state);
  expect(newState.posts.length).toBe(1);
});

it("Profile data should be immutably added to state", () => {
  // 1. test data
  const profileData: ProfileType = {
    userId: 1,
    aboutMe: "",
    lookingForAJob: true,
    lookingForAJobDescription: "",
    fullName: "User",
    contacts: {
      github: "",
      vk: "",
      facebook: "",
      instagram: "",
      twitter: "",
      website: "",
      youtube: "",
      mainLink: "",
    },
    photos: {
      small: "",
      large: "",
    },
  };
  const action = setUserProfile(profileData);

  // 2. action
  const newState = profileReducer(state, action);

  // 3. expectation
  expect(newState).not.toBe(state);
  expect(newState.profile).toEqual(profileData);
});

it("User status should be immutably updated in state", () => {
  // 1. test data
  const newStatus = "New status";
  const action = setUserStatus(newStatus);

  // 2. action
  const newState = profileReducer(state, action);

  // 3. expectation
  expect(newState).not.toBe(state);
  expect(newState.status).toBe(newStatus);
});
