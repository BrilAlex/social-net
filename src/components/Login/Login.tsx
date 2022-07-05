import {FC} from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../common/FormControls/FormControls";
import {required} from "../../utils/validators/validators";
import styles from "./Login.module.css";
import {connect} from "react-redux";
import {login} from "../../redux/authReducer";
import {AppStateType} from "../../redux/store";
import {Redirect} from "react-router-dom";

type LoginFormPropsType = {
  captchaUrl: string | null
};

type LoginFormDataType = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string
};

type MapStateToPropsType = {
  isAuth: boolean
  captchaUrl: string | null
};

type MapDispatchToPropsType = {
  login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
};

type LoginPropsType = MapStateToPropsType & MapDispatchToPropsType;

const LoginForm: FC<InjectedFormProps<LoginFormDataType, LoginFormPropsType> & LoginFormPropsType> = (
  {handleSubmit, error, captchaUrl}
) => {
  return (
    <form onSubmit={handleSubmit}>
      {createField("email", "Email", [required], Input)}
      {createField("password", "Password", [required], Input, {type: "password"})}
      {createField("rememberMe", undefined, [], Input, {type: "checkbox"}, "Remember me")}

      {captchaUrl && <img src={captchaUrl} alt={"captcha"}/>}
      {captchaUrl && createField("captcha", "Symbols on the image", [required], Input)}

      {error && <div className={styles.formError}>{error}</div>}
      <div>
        <button className={styles.submitButton}>Login</button>
      </div>
    </form>
  );
};

const LoginFormContainer = reduxForm<LoginFormDataType, LoginFormPropsType>({form: "loginForm"})(LoginForm);

const Login: FC<LoginPropsType> = (props) => {
  const onLoginFormSubmit = (formData: LoginFormDataType) => {
    props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
  };

  if (props.isAuth) {
    return <Redirect to={"/profile"}/>;
  }

  return (
    <div className={styles.loginPage}>
      <h1>Login</h1>
      <div className={styles.loginForm}>
        <LoginFormContainer onSubmit={onLoginFormSubmit} captchaUrl={props.captchaUrl}/>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl,
});

export default connect(mapStateToProps, {login})(Login);