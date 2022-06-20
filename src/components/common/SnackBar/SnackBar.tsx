import {FC, useEffect} from "react";
import s from "./SnackBar.module.css";
import {useDispatch} from "react-redux";
import {setAppError} from "../../../redux/appReducer";

type SnackBarPropsType = {
  error: string
};

export const SnackBar: FC<SnackBarPropsType> = ({error}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(setAppError(null));
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [dispatch]);

  return (
    <div className={s.snackBar}>{error}</div>
  );
};
