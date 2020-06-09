import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CreateIcon from "@material-ui/icons/Create";

import SignUpForm from "./SignUpForm/SignUpForm";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignUp = (props) => {
    const classes = useStyles();
    const history = useHistory();

    if (localStorage.getItem("token")) {
        history.push("/");
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <CreateIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>

                <SignUpForm />

                <Grid container justify="flex-end">
                    <Grid item>
                        <Link to="/login" component={RouterLink}>
                            Already have an account? Log In
                        </Link>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};

export default SignUp;
