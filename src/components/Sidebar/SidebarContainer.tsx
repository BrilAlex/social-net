import React from "react";
import {StoreContext} from "../../StoreContext";
import {Sidebar} from "./Sidebar";

type SidebarContainerProps = {};

export const SidebarContainer = (props: SidebarContainerProps) => {
    return (
        <StoreContext.Consumer>
            {
                store => {
                    let state = store.getState();
                    let friendsList = state.sidebar.friendsList;
                    return <Sidebar friendsList={friendsList}/>
                }
            }
        </StoreContext.Consumer>
    );
}