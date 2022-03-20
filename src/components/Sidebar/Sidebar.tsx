import {FC} from "react";
import styles from "./Sidebar.module.css";
import {Navbar} from "./Navbar/Navbar";
import {SidebarType} from "../../redux/sidebarReducer";

type SidebarPropsType = {
  state: SidebarType
};

export const Sidebar: FC<SidebarPropsType> = (props) => {
  const friendsElements = props.state.friends.map(f =>
    <div key={f.id} className={styles.friend}>
      <img src={f.avatarSrc} alt={f.name + "'s Avatar"}/>
      <p>{f.name}</p>
    </div>
  );

  return (
    <div className={styles.sidebar}>
      <Navbar/>
      <div className={styles.friendsList}>
        {friendsElements}
      </div>
    </div>
  );
};