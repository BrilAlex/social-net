import React from "react";
import {Sidebar} from "./Sidebar";
import {connect} from "react-redux";
import {RootStateType} from "../../redux/reduxStore";
import {SidebarType} from "../../redux/sidebarReducer";
import {Dispatch} from "redux";

type MapStateToPropsType = SidebarType;
type MapDispatchToPropsType = {};
export type SidebarPropsType = MapStateToPropsType & MapDispatchToPropsType;

const mapStateToProps = (state: RootStateType): MapStateToPropsType => {
    return {
        friendsList: state.sidebar.friendsList
    };
};

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {}
};

export const SidebarContainer = connect(mapStateToProps, mapDispatchToProps)(Sidebar);