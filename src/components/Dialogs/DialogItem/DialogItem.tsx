import React from "react";
import styles from "./DialogItem.module.css";
import {NavLink} from "react-router-dom";
import manAvatar from "./../../../assets/images/man_avatar.png";
import womanAvatar from "./../../../assets/images/woman_avatar.png";

type DialogItemPropsType = {
  id: number
  name: string
};

export const DialogItem: React.FC<DialogItemPropsType> = (props) => {
  const path = "/dialogs/" + props.id;
  const avatarSrc = (props.name === "Karina" || props.name === "Svetlana") ? womanAvatar : manAvatar;

  return (
    <div className={styles.dialog}>
      <NavLink to={path} activeClassName={styles.active}>
        <img src={avatarSrc} alt={props.name + "'s Avatar"}/>
        <span>{props.name}</span>
      </NavLink>
    </div>
  );
};