import React from "react";
import {RootStoreType} from "./redux/reduxStore";

export const StoreContext = React.createContext({} as RootStoreType);

type ProviderType = {
    store: RootStoreType
}

export const Provider: React.FC<ProviderType> = (props) => {
    return (
        <StoreContext.Provider value={props.store}>
            {props.children}
        </StoreContext.Provider>
    );
}