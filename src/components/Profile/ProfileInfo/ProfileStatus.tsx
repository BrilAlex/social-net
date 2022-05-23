import {ChangeEvent, FC, useEffect, useState} from "react";
import s from "./ProfileStatus.module.css";

type ProfileStatusPropsType = {
  status: string
  updateStatus: (newStatus: string) => void
};

export const ProfileStatus: FC<ProfileStatusPropsType> = (props) => {
  const [status, setStatus] = useState(props.status);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const activateEditMode = () => {
    setEditMode(true);
  };

  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateStatus(status);
  };

  const changeStatusText = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value);
  };

  return (
    <div className={s.status}>
      {!editMode &&
      <span className={s.statusText} onDoubleClick={activateEditMode}>
          {props.status || "------"}
      </span>
      }
      {editMode &&
      <input
        className={s.statusInput}
        value={status}
        onChange={changeStatusText}
        onBlur={deactivateEditMode}
        autoFocus
      />
      }
    </div>
  );
};
