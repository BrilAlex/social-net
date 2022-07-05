import {Sidebar} from "./Sidebar";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/store";
import {SidebarInitStateType} from "../../redux/sidebarReducer";

type MapStateToPropsType = {
  state: SidebarInitStateType
};

type MapDispatchToPropsType = {};

export type SidebarPropsType = MapStateToPropsType & MapDispatchToPropsType;

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    state: state.sidebar,
  };
};

const mapDispatchToProps = (): MapDispatchToPropsType => {
  return {};
};

export const SidebarContainer = connect(mapStateToProps, mapDispatchToProps)(Sidebar);