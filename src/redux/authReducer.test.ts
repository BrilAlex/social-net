import {AuthInitStateType, authReducer, setAuthUserData, setAuthUserProfile} from "./authReducer";
import {ProfileType} from "./profileReducer";

let initState: AuthInitStateType;

beforeEach(() => {
  initState = {
    user_ID: 0,
    email: "",
    login: "",
    isAuth: false,
    profile: {} as ProfileType,
  };
});

test("Authorised user data should be set to state", () => {
  const userData: AuthInitStateType = {
    user_ID: 2,
    email: "mail@example.com",
    login: "User",
    isAuth: true,
    profile: {} as ProfileType,
  };
  const {user_ID, email, login} = userData;
  const newState = authReducer(initState, setAuthUserData(user_ID, email, login));

  expect(newState).not.toBe(initState);
  expect(newState.user_ID).toBe(user_ID);
  expect(newState.email).toBe(email);
  expect(newState.login).toBe(login);
  expect(newState.isAuth).toBeTruthy();
  expect(initState.isAuth).toBeFalsy();
});

test("Authorised user profile should be set to state", () => {
  const userProfile: ProfileType = {
    userId: 2,
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
  const newState = authReducer(initState, setAuthUserProfile(userProfile));

  expect(newState).not.toBe(initState);
  expect(newState.profile).toEqual(userProfile);
});