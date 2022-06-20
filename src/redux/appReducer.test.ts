import {appReducer, InitStateType, setAppError, setInitializedSuccessfully} from "./appReducer";

let initState: InitStateType;

beforeEach(() => {
  initState = {
    initialized: false,
    error: null,
  };
});

test("App status should be set to state", () => {
  const newState = appReducer(initState, setInitializedSuccessfully());

  expect(initState.initialized).toBeFalsy();
  expect(newState.initialized).toBeTruthy();
});

test("App error should be set to state", () => {
  const error = "Some error occurred";

  const newState = appReducer(initState, setAppError(error));

  expect(initState.error).toBeNull();
  expect(newState.error).toBe(error);
});
