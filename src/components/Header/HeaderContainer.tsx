import React from "react";
import {connect} from "react-redux";
import {Header} from "./Header";
import {RootStateType} from "../../redux/reduxStore";
import {setAuthUserData} from "../../redux/authReducer";
import {authAPI} from "../../api/api";

type MapStateToPropsType = {
    login: string
    isAuth: boolean
};

type MapDispatchToPropsType = {
    setAuthUserData: (userID: number, email: string, login: string) => void
};

type HeaderAPIPropsType = MapStateToPropsType & MapDispatchToPropsType;

class HeaderContainer extends React.Component<HeaderAPIPropsType> {
    componentDidMount() {
        authAPI.getAuthData().then(data => {
                if(data.resultCode === 0) {
                    let {id, email, login} = data.data;
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