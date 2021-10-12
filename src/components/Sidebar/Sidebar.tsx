import React from "react";
import styles from "./Sidebar.module.css";
import {Navbar} from "./Navbar/Navbar";
import {SidebarPropsType} from "./SidebarContainer";

export const Sidebar: React.FC<SidebarPropsType> = (props) => {
    return (
        <div className={styles.sidebar}>
            <Navbar/>
            <div className={styles.friendsList}>
                {props.friendsList.map((friend) => {
                    return (
                        <div key={friend.id} className={styles.friendItem}>
                            <img src={friend.avatar} alt={friend.avatarAlt}/>
                            <span>{friend.name}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}