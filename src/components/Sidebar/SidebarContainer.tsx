import {Sidebar} from "./Sidebar";
import {StoreContext} from "../../StoreContext";

export const SidebarContainer = () => {
  return <StoreContext.Consumer>
    {
      (store) => {
        const state = store.getState().sidebar;
        return <Sidebar state={state}/>;
      }
    }
  </StoreContext.Consumer>
};