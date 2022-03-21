import {RootStoreType} from "../../redux/reduxStore";
import {Sidebar} from "./Sidebar";

type SidebarContainerPropsType = {
  store: RootStoreType
};

export const SidebarContainer = (props: SidebarContainerPropsType) => {
  const state = props.store.getState().sidebar;

  return <Sidebar state={state}/>
};