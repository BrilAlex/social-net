import {create} from "react-test-renderer";
import {ProfileStatusWithClass} from "./ProfileStatusWithClass";

describe("ProfileStatus Class component", () => {
  test("Status from props should be in component's state", () => {
    const mockCallback = jest.fn();
    const component = create(
      <ProfileStatusWithClass status={"Something"} updateStatus={mockCallback}/>
    );
    const root = component.root;
    expect(root.instance.state.status).toBe("Something");
  });

  test("After creation <span> should be displayed", async () => {
    const mockCallback = jest.fn();
    const component = create(
      <ProfileStatusWithClass status={"Something"} updateStatus={mockCallback}/>
    );
    const root = component.root;
    const span = await root.findByType("span");
    expect(span).not.toBeNull();
  });

  test("After creation <input> shouldn't be displayed", async () => {
    const mockCallback = jest.fn();
    const component = create(
      <ProfileStatusWithClass status={"Something"} updateStatus={mockCallback}/>
    );
    const root = component.root;
    const findInputElement = () => root.findByType("input");
    expect(findInputElement).toThrow();
  });

  test("After creation <span> should contain correct status", async () => {
    const mockCallback = jest.fn();
    const component = create(
      <ProfileStatusWithClass status={"Something"} updateStatus={mockCallback}/>
    );
    const root = component.root;
    const span = await root.findByType("span");
    expect(span.children[0]).toBe("Something");
  });

  test("Input should be displayed in editMode instead of span", async () => {
    const mockCallback = jest.fn();
    const component = create(
      <ProfileStatusWithClass status={"Something"} updateStatus={mockCallback}/>
    );
    const root = component.root;
    const span = await root.findByType("span");
    span.props.onDoubleClick();
    const input = await root.findByType("input");
    expect(input.props.value).toBe("Something");
  });

  test("Callback should be called", async () => {
    const mockCallback = jest.fn();
    const component = create(
      <ProfileStatusWithClass status={"Something"} updateStatus={mockCallback}/>
    );
    const root = component.root;
    root.instance.deactivateEditMode();
    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
