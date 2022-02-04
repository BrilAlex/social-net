import React from "react";
import styles from "./Dialogs.module.css";
import {NavLink} from "react-router-dom";

type DialogsPropsType = {};

export const Dialogs = (props: DialogsPropsType) => {
  const getNavLinkClassName = (navData: {isActive: boolean}) => {
    return navData.isActive ? styles.active : "";
  };

  return (
    <div className={styles.dialogsPage}>
      <div className={styles.dialogsContainer}>
        <div className={styles.dialog + " " + styles.active}>
          <NavLink to={"/dialogs/1"} className={(navData) => getNavLinkClassName(navData)}>
            Karina
          </NavLink>
        </div>
        <div className={styles.dialog}>
          <NavLink to={"/dialogs/2"} className={(navData) => getNavLinkClassName(navData)}>
            Dimych
          </NavLink>
        </div>
        <div className={styles.dialog}>
          <NavLink to={"/dialogs/3"} className={(navData) => getNavLinkClassName(navData)}>
            Sergei
          </NavLink>
        </div>
        <div className={styles.dialog}>
          <NavLink to={"/dialogs/4"} className={(navData) => getNavLinkClassName(navData)}>
            Alexander
          </NavLink>
        </div>
        <div className={styles.dialog}>
          <NavLink to={"/dialogs/5"} className={(navData) => getNavLinkClassName(navData)}>
            Svetlana
          </NavLink>
        </div>
      </div>
      <div className={styles.messagesContainer}>
        <div className={styles.message}>
          <div className={styles.senderInfo}>
            <img className={styles.senderAvatar} src={""} alt={"My Avatar"}/>
            <p className={styles.senderName}>Me</p>
          </div>
          <div className={styles.messageContent}>
            <p className={styles.messageText}>Hi!</p>
            <span className={styles.messageTime}>12:05</span>
          </div>
        </div>
        <div className={styles.message}>
          <div className={styles.senderInfo}>
            <img className={styles.senderAvatar} src={""} alt={"User Avatar"}/>
            <p className={styles.senderName}>User</p>
          </div>
          <div className={styles.messageContent}>
            <p className={styles.messageText}>Yo! How are you?</p>
            <span className={styles.messageTime}>12:18</span>
          </div>
        </div>
        <div className={styles.message}>
          <div className={styles.senderInfo}>
            <img className={styles.senderAvatar} src={""} alt={"My Avatar"}/>
            <p className={styles.senderName}>Me</p>
          </div>
          <div className={styles.messageContent}>
            <p className={styles.messageText}>Fine, studying in IT-Incubator now. And you?</p>
            <span className={styles.messageTime}>12:24</span>
          </div>
        </div>
      </div>
    </div>
  );
};