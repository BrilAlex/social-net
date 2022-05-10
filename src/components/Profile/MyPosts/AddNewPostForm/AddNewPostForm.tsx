import React, {FC} from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../../utils/validators/validators";
import {Textarea} from "../../../common/FormControls/FormControls";
import styles from "./AddNewPostForm.module.css";

export type AddNewPostFormDataType = {
  newPostText: string
};

const maxLength10 = maxLengthCreator(10);

const AddNewPostForm: FC<InjectedFormProps<AddNewPostFormDataType>> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field
        name={"newPostText"}
        component={Textarea}
        placeholder={"Enter new post text"}
        validate={[required, maxLength10]}
      />
      <button className={styles.submitButton}>Add post</button>
    </form>
  );
};

export default reduxForm<AddNewPostFormDataType>({form: "addNewPostForm"})(AddNewPostForm);
