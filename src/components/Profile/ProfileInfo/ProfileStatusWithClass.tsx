import React, {ChangeEvent} from "react";
import s from "./ProfileStatus.module.css";

type ProfileStatusPropsType = {
  status: string
  updateStatus: (newStatus: string) => void
};

type ProfileStatusStateType = {
  editMode: boolean
  status: string
};

export class ProfileStatusWithClass extends React.Component<ProfileStatusPropsType, ProfileStatusStateType> {
  state = {
    editMode: false,
    status: this.props.status,
  };

  componentDidUpdate(prevProps: ProfileStatusPropsType, prevState: ProfileStatusStateType) {
    if (this.props.status !== prevProps.status) {
      this.setState({
        status: this.props.status,
      });
    }
  };

  activateEditMode = () => {
    this.setState({
      editMode: true,
    });
  };

  deactivateEditMode = () => {
    this.setState({
      editMode: false,
    });
    this.props.updateStatus(this.state.status);
  };

  changeStatusText = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      status: e.currentTarget.value,
    });
  };

  render() {
    return (
      <div className={s.status}>
        {!this.state.editMode &&
        <span className={s.statusText} onDoubleClick={this.activateEditMode}>
          {this.props.status || "------"}
        </span>
        }
        {this.state.editMode &&
        <input
          className={s.statusInput}
          value={this.state.status}
          onChange={this.changeStatusText}
          onBlur={this.deactivateEditMode}
          autoFocus
        />
        }
      </div>
    );
  };
}
