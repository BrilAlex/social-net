import styles from "./Preloader.module.css";
import preloader from "./../../../assets/images/preloader.gif";

export const Preloader = () => {
  return (
    <div className={styles.preloader}>
      <img src={preloader} alt={"Data is fetching"}/>
    </div>
  );
};