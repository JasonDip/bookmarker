import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import * as authenticationDuck from "../../../redux/ducks/authentication";

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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    link: {
        textDecoration: "none",
    },
}));

const LoginForm = (props) => {
    const classes = useStyles();

    // from redux props
    const { login } = props;

    const demoAccountCheckHandler = (event, setFieldValue) => {
        if (event.target.checked) {
            setFieldValue("email", "myemail1@gmail.com");
            setFieldValue("password", "mypass");
        } else {
            setFieldValue("email", "");
            setFieldValue("password", "");
        }
    };

    return (
        <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={Yup.object({
                email: Yup.string()
                    .email("Invalid email.")
                    .required("Required."),
                password: Yup.string().required("Required."),
            })}
            onSubmit={(value, { setSubmitting }) => {
                // dispatch login
                login(value.email, value.password);
                setSubmitting(false);
            }}
        >
            {({ setFieldValue, isSubmitting }) => (
                <Form className={classes.form}>
                    <Field name="email">
                        {({ field }) => (
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                // autoFocus
                                {...field}
                            />
                        )}
                    </Field>
                    <div style={{ color: "red" }}>
                        <ErrorMessage name="email" />
                    </div>

                    <Field name="password">
                        {({ field }) => (
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                {...field}
                            />
                        )}
                    </Field>
                    <div style={{ color: "red" }}>
                        <ErrorMessage name="password" />
                    </div>

                    <FormControlLabel
                        control={
                            <Checkbox
                                value="usedemo"
                                color="primary"
                                onChange={(e) =>
                                    demoAccountCheckHandler(e, setFieldValue)
                                }
                            />
                        }
                        label="Use a Demo Account"
                    />

                    <Field name="submitButton">
                        {({ field, form, meta }) => (
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                disabled={isSubmitting}
                                {...field}
                            >
                                Log In
                            </Button>
                        )}
                    </Field>
                </Form>
            )}
        </Formik>
    );
};

const mapStateToProps = (state) => {
    return {
        authentication: state.authentication,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (email, password) =>
            dispatch(authenticationDuck.login(email, password)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
