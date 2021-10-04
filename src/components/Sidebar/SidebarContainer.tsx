import React from "react";
import {RootStoreType} from "../../redux/reduxStore";
import {Sidebar} from "./Sidebar";

type SidebarContainerProps = {
    store: RootStoreType
}

export const SidebarContainer = (props: SidebarContainerProps) => {
    let state = props.store.getState();
    let friendsList = state.sidebar.friendsList;

    return <Sidebar friendsList={friendsList}/>;
}