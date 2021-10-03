import React from "react";
import {NavLink} from "react-router-dom";
import styles from "./../Dialogs.module.css";
import {DialogType} from "../../../redux/dialogsReducer";

export const DialogItem: React.FC<DialogType> = (props) => {
    return (
        <div className={styles.dialog}>
            <NavLink to={"/dialogs/" + props.id}>{props.name}</NavLink>
        </div>
    );
}
