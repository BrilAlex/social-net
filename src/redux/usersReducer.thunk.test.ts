import {followAPI, usersAPI, UsersAPIResponseType} from "../api/usersApi";
import {APIResponseType, ResultCode} from "../api/api";
import {
  follow,
  followUser,
  requestUsers, setCurrentPage, setTotalUsersCount, setUsers,
  toggleFollowingProgress, toggleIsFetching,
  unfollow,
  unfollowUser
} from "./usersReducer";

jest.mock("../api/usersApi");
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;
const followAPIMock = followAPI as jest.Mocked<typeof followAPI>;
const dispatchMock = jest.fn();
const getStateMock = jest.fn();

const usersAPIResponseData: UsersAPIResponseType = {
  items: [],
  totalCount: 0,
  error: "",
};

const followAPIResponseData: APIResponseType = {
  resultCode: ResultCode.Success,
  messages: [],
  data: {},
};

beforeEach(() => {
  dispatchMock.mockClear();
  getStateMock.mockClear();
  usersAPIMock.getUsers.mockClear();
  followAPIMock.follow.mockClear();
  followAPIMock.unfollow.mockClear();
});

test('Thunk requestUsers should work correctly', async () => {
  usersAPIMock.getUsers.mockReturnValue(Promise.resolve(usersAPIResponseData));

  const page = 1;
  const pageSize = 10;
  const thunk = requestUsers(page, pageSize);

  await thunk(dispatchMock, getStateMock, {});

  expect(dispatchMock).toBeCalledTimes(5);
  expect(dispatchMock).toHaveBeenNthCalledWith(1, toggleIsFetching(true));
  expect(dispatchMock).toHaveBeenNthCalledWith(2, setCurrentPage(page));
  expect(dispatchMock).toHaveBeenNthCalledWith(3, toggleIsFetching(false));
  expect(dispatchMock).toHaveBeenNthCalledWith(4, setUsers(usersAPIResponseData.items));
  expect(dispatchMock).toHaveBeenNthCalledWith(5, setTotalUsersCount(usersAPIResponseData.totalCount));
});

test('Thunk follow should work correctly', async () => {
  followAPIMock.follow.mockReturnValue(Promise.resolve(followAPIResponseData));

  const userID = 1;
  const thunk = follow(userID);

  await thunk(dispatchMock, getStateMock, {});

  expect(dispatchMock).toBeCalledTimes(3);
  expect(dispatchMock).toHaveBeenNthCalledWith(1, toggleFollowingProgress(true, userID));
  expect(dispatchMock).toHaveBeenNthCalledWith(2, followUser(userID));
  expect(dispatchMock).toHaveBeenNthCalledWith(3, toggleFollowingProgress(false, userID));
});

test('Thunk unfollow should work correctly', async () => {
  followAPIMock.unfollow.mockReturnValue(Promise.resolve(followAPIResponseData));

  const userID = 2;
  const thunk = unfollow(userID);

  await thunk(dispatchMock, getStateMock, {});

  expect(dispatchMock).toBeCalledTimes(3);
  expect(dispatchMock).toHaveBeenNthCalledWith(1, toggleFollowingProgress(true, userID));
  expect(dispatchMock).toHaveBeenNthCalledWith(2, unfollowUser(userID));
  expect(dispatchMock).toHaveBeenNthCalledWith(3, toggleFollowingProgress(false, userID));
});
