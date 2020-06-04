import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import UserMenu from "./UserMenu/UserMenu";

const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    title: {
        flexGrow: 1,
        "-webkit-touch-callout": "none",
        "-webkit-user-select": "none",
        "-khtml-user-select": "none",
        "-moz-user-select": "none",
        "-ms-user-select": "none",
        "user-select": "none",
    },
}));

const NavBar = (props) => {
    const classes = useStyles();
    const history = useHistory();

    let userButton = null;
    if (props.authentication.name) {
        userButton = <UserMenu username={props.authentication.name} />;
    } else if (props.authentication.email) {
        userButton = <UserMenu username={props.authentication.email} />;
    } else {
        userButton = (
            <>
                <Button color="inherit" onClick={() => history.push("/about")}>
                    About
                </Button>
                <Button color="inherit" onClick={() => history.push("/login")}>
                    Login
                </Button>
                <Button color="inherit" onClick={() => history.push("/signup")}>
                    Signup
                </Button>
            </>
        );
    }

    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <Typography variant="h6" noWrap className={classes.title}>
                    <span
                        onClick={() => history.push("/")}
                        style={{ cursor: "pointer" }}
                    >
                        Bookmarker
                    </span>
                </Typography>

                {userButton}
            </Toolbar>
        </AppBar>
    );
};

const mapStateToProps = (state) => {
    return { authentication: state.authentication };
};

export default connect(mapStateToProps, null)(NavBar);
