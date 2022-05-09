import React, {FC} from "react";
import styles from "../Dialogs.module.css";
import {Field, InjectedFormProps, reduxForm} from "redux-form";

export type SendNewMessageFormDataType = {
  newMessageText: string
};

const SendNewMessageForm: FC<InjectedFormProps<SendNewMessageFormDataType>> = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className={styles.newMessageBlock}>
      <Field
        name={"newMessageText"}
        component={"textarea"}
        placeholder={"Enter your message"}
      />
      <button>Send message</button>
    </form>
  );
};

export const SendNewMessageFormContainer = reduxForm<SendNewMessageFormDataType>({form: "sendNewMessageForm"})(SendNewMessageForm);