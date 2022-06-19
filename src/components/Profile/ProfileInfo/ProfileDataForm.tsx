import {FC} from "react";
import {ProfileType} from "../../../api/api";
import {createField, Input, Textarea} from "../../common/FormControls/FormControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import styles from "../../Login/Login.module.css";

type ProfileDataFormPropsType = {
  profile: ProfileType
};

const ProfileDataForm: FC<InjectedFormProps<ProfileType, ProfileDataFormPropsType> & ProfileDataFormPropsType> = (
  {handleSubmit, error, profile}
) => {
  return (
    <form onSubmit={handleSubmit}>
      <h3>Profile info:</h3>
      {error && <div className={styles.formError}>{error}</div>}
      <div>
        <b>Name</b>:
        {createField("fullName", "Full name", [], Input)}
      </div>
      <div>
        <b>About me</b>:
        {createField("aboutMe", "About me", [], Textarea)}
      </div>
      <div>
        <b>Looking for a job</b>:
        {createField("lookingForAJob", "About me", [], Input, {type: "checkbox"})}
      </div>
      <div>
        <b>My skills</b>:
        {createField("lookingForAJobDescription", "My skills", [], Textarea)}
      </div>
      <div>
        <div><b>Contacts</b></div>
        {Object.keys(profile.contacts).map(key =>
          <div key={key}>
            {key}: {createField("contacts." + key, key, [], Input)}
          </div>
        )}
      </div>
      <div>
        <button>Save</button>
      </div>
    </form>
  );
};

export const ProfileDataFormContainer = reduxForm<ProfileType, ProfileDataFormPropsType>({form: "editProfileForm"})(ProfileDataForm);
