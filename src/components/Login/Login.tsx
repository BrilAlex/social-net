import {FC} from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";

type LoginFormDataType = {
  login: string
  password: string
  rememberMe: boolean
};

type LoginPropsType = {
  sendLoginData: (loginFormData: {email: string, password: string, rememberMe: boolean}) => void
};

const LoginForm: FC<InjectedFormProps<LoginFormDataType>> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field name={"login"} component={"input"} placeholder={"Login"}/>
      </div>
      <div>
        <Field name={"password"} component={"input"} type={"password"} placeholder={"Password"}/>
      </div>
      <div>
        <Field name={"rememberMe"} component={"input"} type={"checkbox"}/> Remember me
      </div>
      <div>
        <button>Login</button>
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
    <div>
      <h1>Login</h1>
      <LoginFormContainer onSubmit={onLoginFormSubmit}/>
    </div>
  );
};