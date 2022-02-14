import React from "react";
import styles from "./../Dialogs.module.css";
import {NavLink} from "react-router-dom";

type DialogItemPropsType = {
  id: number
  name: string
};

export const DialogItem = (props: DialogItemPropsType) => {
  const path = "/dialogs/" + props.id;

  const getNavLinkClassName = (navData: {isActive: boolean}) => {
    return navData.isActive ? styles.active : "";
  };

  return (
    <div className={styles.dialog}>
      <NavLink to={path} className={(navData) => getNavLinkClassName(navData)}>
        {props.name}
      </NavLink>
    </div>
  );
};