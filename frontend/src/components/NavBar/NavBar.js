import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    title: {
        flexGrow: 1,
    },
}));

const NavBar = (props) => {
    const classes = useStyles();

    let userButton = null;
    if (props.authentication.name) {
        userButton = props.authentication.name; // TODO: change this to a dropdown with options
    } else if (props.authentication.email) {
        userButton = props.authentication.email;
    } else {
        userButton = <Button color="inherit">Login</Button>;
    }

    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <Typography variant="h6" noWrap className={classes.title}>
                    Bookmarker
                </Typography>
                <Button color="inherit">About</Button>
                {userButton}
            </Toolbar>
        </AppBar>
    );
};

const mapStateToProps = (state) => {
    return { authentication: state.authentication };
};

export default connect(mapStateToProps, null)(NavBar);
