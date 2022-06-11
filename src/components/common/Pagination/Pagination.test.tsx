import {create} from "react-test-renderer";
import {Pagination} from "./Pagination";


describe("Pagination component tests", () => {
  test("Items count is 11, but only 10 pages should be displayed", async () => {
    const mockCallback = jest.fn();
    const component = create(
      <Pagination
        totalItemsCount={11}
        pageSize={1}
        portionSize={10}
        currentPage={1}
        setCurrentPage={mockCallback}
      />
    );
    const root = component.root;
    const spans = await root.findAllByType("span");
    expect(spans.length).toBe(10);
  });

  test("If pages count is more then 10, 'Next' button should be displayed", async () => {
    const mockCallback = jest.fn();
    const component = create(
      <Pagination
        totalItemsCount={11}
        pageSize={1}
        portionSize={10}
        currentPage={1}
        setCurrentPage={mockCallback}
      />
    );
    const root = component.root;
    const button = await root.findAllByType("button");
    expect(button.length).toBe(1);
  });
});