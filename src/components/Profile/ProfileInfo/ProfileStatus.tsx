import React, {ChangeEvent} from "react";
import s from "./ProfileStatus.module.css";

type ProfileStatusPropsType = {
  status: string
};

export class ProfileStatus extends React.Component<ProfileStatusPropsType> {
  state = {
    editMode: false,
    statusText: "",
  };

  activateEditMode = () => {
    this.setState({
      editMode: true,
      statusText: this.props.status,
    });
  };

  deactivateEditMode = () => {
    this.setState({
      editMode: false,
      statusText: "",
    });
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
          {this.props.status}
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