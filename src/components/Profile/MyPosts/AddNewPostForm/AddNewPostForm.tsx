import styles from "../MyPosts.module.css";
import React, {FC} from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";

export type AddNewPostFormDataType = {
  newPostText: string
};

const AddNewPostForm: FC<InjectedFormProps<AddNewPostFormDataType>> = (props) => {
  return (
    <form className={styles.newPostBlock} onSubmit={props.handleSubmit}>
      <Field
        name={"newPostText"}
        component={"textarea"}
        placeholder={"Enter new post text"}
      />
      <button>Add post</button>
    </form>
  );
};

export const AddNewPostFormContainer = reduxForm<AddNewPostFormDataType>({form: "addNewPostForm"})(AddNewPostForm);