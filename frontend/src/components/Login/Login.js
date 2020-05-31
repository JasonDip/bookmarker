import React from "react";
import { connect } from "react-redux";

import * as authenticationActions from "../../redux/ducks/authentication";

const Login = (props) => {
    // from redux props
    const { login } = props;
    const loginHandler = () => {
        login("a", "b");
    };

    return <button onClick={loginHandler}>Login</button>;
};

const mapStateToProps = (state) => {
    return {
        authentication: state.authentication,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: () => dispatch(authenticationActions.login()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
