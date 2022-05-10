import {FC} from "react";
import s from "./FormControls.module.css";
import {WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";

type FormControlsPropsType = {
  meta: WrappedFieldMetaProps
}

const FormControl: FC<FormControlsPropsType> = ({meta: {touched, error}, children}) => {
  const hasError = touched && error;

  return (
    <div className={`${s.formControl} ${hasError ? s.error : ""}`}>
      {children}
      {hasError && <span className={s.errorMessage}>{error}</span>}
    </div>
  );
};

export const Textarea: FC<WrappedFieldProps> = (props) => {
  const {input, meta, ...restProps} = props;
  return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>;
};

export const Input: FC<WrappedFieldProps> = (props) => {
  const {input, meta, ...restProps} = props;
  return <FormControl {...props}><input {...input} {...restProps}/></FormControl>;
};