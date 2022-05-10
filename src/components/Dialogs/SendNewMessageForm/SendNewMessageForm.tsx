import React, {FC} from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../../common/FormControls/FormControls";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import styles from "./SendNewMessageForm.module.css";

export type SendNewMessageFormDataType = {
  newMessageText: string
};

const maxLength50 = maxLengthCreator(50);

const SendNewMessageForm: FC<InjectedFormProps<SendNewMessageFormDataType>> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field
        name={"newMessageText"}
        component={Textarea}
        placeholder={"Enter your message"}
        validate={[required, maxLength50]}
      />
      <button className={styles.submitButton}>Send message</button>
    </form>
  );
};

export default reduxForm<SendNewMessageFormDataType>({form: "sendNewMessageForm"})(SendNewMessageForm);
