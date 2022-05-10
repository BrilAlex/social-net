import {FC} from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../common/FormControls/FormControls";
import {required} from "../../utils/validators/validators";
import styles from "./Login.module.css";

type LoginFormDataType = {
  login: string
  password: string
  rememberMe: boolean
};

type LoginPropsType = {
  sendLoginData: (loginFormData: { email: string, password: string, rememberMe: boolean }) => void
};

const LoginForm: FC<InjectedFormProps<LoginFormDataType>> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          name={"login"}
          component={Input}
          placeholder={"Login"}
          validate={[required]}
        />
      </div>
      <div>
        <Field
          name={"password"}
          component={Input}
          type={"password"}
          placeholder={"Password"}
          validate={[required]}
        />
      </div>
      <div>
        <Field name={"rememberMe"} component={"input"} type={"checkbox"}/> Remember me
      </div>
      <div>
        <button className={styles.submitButton}>Login</button>
      </div>
    </form>
  );
};

const LoginFormContainer = reduxForm<LoginFormDataType>({form: "loginForm"})(LoginForm);

export const Login: FC<LoginPropsType> = (props) => {
  const onLoginFormSubmit = (formData: LoginFormDataType) => {
    const loginData = {
      email: formData.login,
      password: formData.password,
      rememberMe: formData.rememberMe
    };
    props.sendLoginData(loginData);
  };

  return (
    <div className={styles.loginPage}>
      <h1>Login</h1>
      <div className={styles.loginForm}>
        <LoginFormContainer onSubmit={onLoginFormSubmit}/>
      </div>
    </div>
  );
};
