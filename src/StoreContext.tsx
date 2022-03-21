import React from "react";
import {RootStoreType} from "./redux/reduxStore";

export const StoreContext = React.createContext({} as RootStoreType);

type ProviderPropsType = {
  store: RootStoreType
};

export const Provider: React.FC<ProviderPropsType> = (props) => {
  return (
    <StoreContext.Provider value={props.store}>
      {props.children}
    </StoreContext.Provider>
  );
};