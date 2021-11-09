import React from "react";
import {connect} from "react-redux";
import {Header} from "./Header";
import {RootStateType} from "../../redux/reduxStore";
import {getAuthUserData} from "../../redux/authReducer";

type MapStateToPropsType = {
    login: string
    isAuth: boolean
};

type MapDispatchToPropsType = {
    getAuthUser: () => void
};

type HeaderAPIPropsType = MapStateToPropsType & MapDispatchToPropsType;

class HeaderContainer extends React.Component<HeaderAPIPropsType> {
    componentDidMount() {
        this.props.getAuthUser();
    }
    render() {
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state: RootStateType): MapStateToPropsType => ({
    login: state.auth.login,
    isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, {getAuthUser: getAuthUserData})(HeaderContainer);