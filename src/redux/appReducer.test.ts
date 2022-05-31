import {appReducer, InitStateType, setInitializedSuccessfully} from "./appReducer";

test("App status should be set to state", () => {
  const initState: InitStateType = {
    initialized: false,
  };

  const newState = appReducer(initState, setInitializedSuccessfully());

  expect(initState.initialized).toBeFalsy();
  expect(newState.initialized).toBeTruthy();
});
