import {
  addNewPostAC,
  ProfileInitStateType,
  profileReducer, ProfileType, setUserProfile, setUserStatus
} from "./profileReducer";

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

test("New post should be immutably added", () => {
  const newPostText = "Hello world!";
  const action = addNewPostAC(newPostText);

  const newState = profileReducer(state, action);

  expect(newState).not.toBe(state);
  expect(newState.posts.length).toBe(3);
  expect(newState.posts[2].id).toBe(3);
  expect(newState.posts[2].postText).toBe(newPostText);
});

test("Profile data should be immutably added to state", () => {
  const profileData: ProfileType = {
    userId: 1,
    aboutMe: "",
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

test("User status should be immutably updated in state", () => {
  const newStatus = "New status";
  const action = setUserStatus(newStatus);

  const newState = profileReducer(state, action);

  expect(newState).not.toBe(state);
  expect(newState.status).toBe(newStatus);
});