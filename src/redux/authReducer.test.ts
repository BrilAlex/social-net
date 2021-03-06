import {AuthInitStateType, authReducer, setAuthUserData, setCaptchaUrl} from "./authReducer";

let initState: AuthInitStateType;

beforeEach(() => {
  initState = {
    user_ID: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null,
  };
});

test("Authorised user data should be set to state", () => {
  const userData: AuthInitStateType = {
    user_ID: 2,
    email: "mail@example.com",
    login: "User",
    isAuth: true,
    captchaUrl: null,
  };
  const {user_ID, email, login, isAuth} = userData;
  const newState = authReducer(initState, setAuthUserData(user_ID, email, login, isAuth));

  expect(newState).not.toBe(initState);
  expect(newState.user_ID).toBe(user_ID);
  expect(newState.email).toBe(email);
  expect(newState.login).toBe(login);
  expect(newState.isAuth).toBeTruthy();
  expect(initState.isAuth).toBeFalsy();
});

test ("Captcha URL should be set to state", () => {
  const captchaUrl = "Some URL";
  const newState = authReducer(initState, setCaptchaUrl(captchaUrl));

  expect(newState.captchaUrl).toBe(captchaUrl);
  expect(initState.captchaUrl).toBeNull();
});
