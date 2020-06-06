import React from "react";
import { connect } from "react-redux";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import * as userActions from "../../../redux/actions/user";

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

const SignUpForm = (props) => {
    // passed in by redux
    const { createNewUser } = props;

    const classes = useStyles();

    return (
        <Formik
            initialValues={{
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
            }}
            validationSchema={Yup.object({
                name: Yup.string().required("Required."),
                email: Yup.string()
                    .email("Invalid email.")
                    .required("Required."),
                password: Yup.string()
                    .min(6, "Password must be at least 6 characters.")
                    .max(128, "Password cannot exceed 128 characters.")
                    .required("Required."),
                confirmPassword: Yup.string().when("password", {
                    is: (val) => val && val.length > 0,
                    then: Yup.string()
                        .oneOf([Yup.ref("password")], "Passwords must match.")
                        .required("Required."),
                }),
            })}
            onSubmit={(value, { setSubmitting, resetForm }) => {
                // dispatch create new user
                createNewUser({
                    name: value.name,
                    email: value.email,
                    password: value.password,
                });
                setSubmitting(false);
                resetForm();
            }}
        >
            {({ setFieldValue, isSubmitting }) => (
                <Form className={classes.form}>
                    <Field name="name">
                        {({ field }) => (
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                name="name"
                                // autoFocus
                                {...field}
                            />
                        )}
                    </Field>
                    <div style={{ color: "red" }}>
                        <ErrorMessage name="name" />
                    </div>

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
                                {...field}
                            />
                        )}
                    </Field>
                    <div style={{ color: "red" }}>
                        <ErrorMessage name="password" />
                    </div>

                    <Field name="confirmPassword">
                        {({ field }) => (
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                id="confirmPassword"
                                {...field}
                            />
                        )}
                    </Field>
                    <div style={{ color: "red" }}>
                        <ErrorMessage name="confirmPassword" />
                    </div>

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
                                Sign Up
                            </Button>
                        )}
                    </Field>
                </Form>
            )}
        </Formik>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        createNewUser: (userObj) =>
            dispatch(userActions.createNewUser(userObj)),
    };
};

export default connect(null, mapDispatchToProps)(SignUpForm);
