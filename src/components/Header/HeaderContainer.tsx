import React from "react";
import {connect} from "react-redux";
import {Header} from "./Header";
import {RootStateType} from "../../redux/reduxStore";
import {AuthStateType, setAuthUserData} from "../../redux/authReducer";
import axios from "axios";

type MapStateToPropsType = {
    login: string
    isAuth: boolean
};

type MapDispatchToPropsType = {
    setAuthUserData: (userID: number, email: string, login: string) => void
};

type HeaderAPIPropsType = MapStateToPropsType & MapDispatchToPropsType;

type AuthResponseType = {
    data: {id: number, email: string, login: string}
    resultCode: number
    messages: Array<string>
};

class HeaderContainer extends React.Component<HeaderAPIPropsType> {
    componentDidMount() {
        axios
            .get<AuthResponseType>(
                "https://social-network.samuraijs.com/api/1.0/auth/me",
                {withCredentials: true}
            )
            .then(response => {
                if(response.data.resultCode === 0) {
                    let {id, email, login} = response.data.data;
                    this.props.setAuthUserData(id, email, login);
                }
            });
    }
    render() {
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state: RootStateType): MapStateToPropsType => ({
    login: state.auth.login,
    isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer);