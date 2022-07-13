import {authAPI, MeResponseDataType} from "../api/authApi";
import {APIResponseType, ResultCode, ResultCodeForCaptcha} from "../api/api";
import {getAuthUserData, login, logout, setAuthUserData} from "./authReducer";

jest.mock("../api/authApi");
const authAPIMock = authAPI as jest.Mocked<typeof authAPI>;
const dispatchMock = jest.fn();
const getStateMock = jest.fn();

const meResponseData: APIResponseType<MeResponseDataType> = {
  resultCode: ResultCode.Success,
  messages: [],
  data: {
    id: 1,
    email: "test@mail.com",
    login: "test",
  },
};

const loginRequestParams = {
  email: "test@mail.com",
  password: "testPassword",
  rememberMe: false,
  captcha: "",
};

const loginResponseData: APIResponseType<{ userId: number }, ResultCode | ResultCodeForCaptcha> = {
  resultCode: ResultCode.Success,
  messages: [],
  data: {
    userId: 1,
  }
};

const logoutResponseData: APIResponseType = {
  resultCode: ResultCode.Success,
  messages: [],
  data: {},
};

beforeEach(() => {
  dispatchMock.mockClear();
  getStateMock.mockClear();
  authAPIMock.me.mockClear();
  authAPIMock.login.mockClear();
  authAPIMock.logout.mockClear();
});

test("Thunk getAuthUserData should work correctly", async () => {
  authAPIMock.me.mockReturnValue(Promise.resolve(meResponseData));

  const {id, email, login} = meResponseData.data;
  const thunk = getAuthUserData();

  await thunk(dispatchMock, getStateMock, {});

  expect(dispatchMock).toBeCalledTimes(1);
  expect(dispatchMock).toHaveBeenNthCalledWith(1, setAuthUserData(id, email, login, true));
});

test("Thunk login should work correctly", async () => {
  authAPIMock.login.mockReturnValue(Promise.resolve(loginResponseData));

  const {email, password, rememberMe, captcha} = loginRequestParams;
  const thunk = login(email, password, rememberMe, captcha);

  await thunk(dispatchMock, getStateMock, {});

  expect(dispatchMock).toBeCalledTimes(1);
});

test("Thunk logout should work correctly", async () => {
  authAPIMock.logout.mockReturnValue(Promise.resolve(logoutResponseData));

  const thunk = logout();

  await thunk(dispatchMock, getStateMock, {});

  expect(dispatchMock).toBeCalledTimes(1);
  expect(dispatchMock).toHaveBeenNthCalledWith(1, setAuthUserData(null, null, null, false));
});
