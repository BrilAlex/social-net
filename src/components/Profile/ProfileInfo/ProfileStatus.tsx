import React, {ChangeEvent} from "react";
import s from "./ProfileStatus.module.css";

type ProfileStatusPropsType = {
  status: string
  updateStatus: (newStatus: string) => void
};

type ProfileStatusStateType = {
  editMode: boolean
  statusText: string
};

export class ProfileStatus extends React.Component<ProfileStatusPropsType> {
  state: ProfileStatusStateType = {
    editMode: false,
    statusText: this.props.status,
  };

  componentDidUpdate(prevProps:ProfileStatusPropsType, prevState: ProfileStatusStateType) {
    if (this.props.status !== prevProps.status) {
      this.setState({
        statusText: this.props.status,
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
    this.props.updateStatus(this.state.statusText);
  };

  changeStatusText = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      statusText: e.currentTarget.value,
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
          value={this.state.statusText}
          onChange={this.changeStatusText}
          onBlur={this.deactivateEditMode}
          autoFocus
        />
        }
      </div>
    );
  };
}