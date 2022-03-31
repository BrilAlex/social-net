import {followUserAC, setUsersAC, unfollowUserAC, UsersInitStateType, usersReducer} from "./usersReducer";

let state: UsersInitStateType;

beforeEach(() => {
  state = {
    users: [
      {
        id: 1,
        name: "Dmitri K.",
        status: "I am looking for a job right now...",
        photos: {small: "", large: ""},
        followed: false,
      },
      {
        id: 2,
        name: "Svetlana D.",
        status: "I am so pretty",
        photos: {small: "", large: ""},
        followed: false,
      },
      {
        id: 3,
        name: "Sergei S.",
        status: "I like football!!!",
        photos: {small: "", large: ""},
        followed: true,
      },
    ]
  };
});

test("Correct user should be followed", () => {
  const user_ID = 2;

  const newState = usersReducer(state, followUserAC(user_ID));

  expect(newState).not.toBe(state);
  expect(newState.users).not.toBe(state.users);
  expect(newState.users[1].followed).toBeTruthy();
  expect(state.users[1].followed).toBeFalsy();
});

test("Correct user should be unfollowed", () => {
  const user_ID = 3;

  const newState = usersReducer(state, unfollowUserAC(user_ID));

  expect(newState).not.toBe(state);
  expect(newState.users).not.toBe(state.users);
  expect(newState.users[2].followed).toBeFalsy();
  expect(state.users[2].followed).toBeTruthy();
});

test("Users should be correctly added to initial array", () => {
  const newUsers = [
    {
      id: 4,
      avatarUrl: "",
      name: "Andrew T.",
      status: "I am free to help you to create good Video Production",
      photos: {small: "", large: ""},
      followed: true,
    },
    {
      id: 5,
      avatarUrl: "",
      name: "Alex B.",
      status: "I am studying in IT-Incubator! It's really cool!",
      photos: {small: "Belarus", large: "Minsk"},
      followed: true,
    },
  ];

  const newState = usersReducer(state, setUsersAC(newUsers));

  expect(newState).not.toBe(state);
  expect(newState.users).not.toBe(state.users);
  expect(newState.users.length).toBe(5);
  expect(state.users.length).toBe(3);
  expect(newState.users[4].name).toBe("Alex B.");
});