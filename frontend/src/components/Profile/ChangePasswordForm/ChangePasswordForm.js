import React from "react";
import { connect } from "react-redux";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import * as userActions from "../../../redux/actions/user";

function ChangePasswordForm(props) {
    // passed in by redux
    const { changePassword } = props;

    return (
        <Formik
            initialValues={{
                password: "",
                newPassword: "",
                confirmPassword: "",
            }}
            validationSchema={Yup.object({
                password: Yup.string()
                    .min(6, "Password must be at least 6 characters.")
                    .max(128, "Password cannot exceed 128 characters.")
                    .required("Required."),
                newPassword: Yup.string()
                    .min(6, "Password must be at least 6 characters.")
                    .max(128, "Password cannot exceed 128 characters.")
                    .required("Required."),
                confirmPassword: Yup.string().when("newPassword", {
                    is: (val) => val && val.length > 0,
                    then: Yup.string()
                        .oneOf(
                            [Yup.ref("newPassword")],
                            "New password fields must match."
                        )
                        .required("Required."),
                }),
            })}
            onSubmit={(value, { setSubmitting }) => {
                // dispatch change password
                changePassword(value.password, value.newPassword);
                setSubmitting(false);
            }}
        >
            {({ setFieldValue, isSubmitting }) => (
                <Form
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "100%",
                    }}
                >
                    <Typography variant="h6">Change Password</Typography>

                    <Field name="password">
                        {({ field }) => (
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                name="password"
                                label="Password"
                                type="password"
                                id="oldPassword"
                                {...field}
                                style={{ width: "40%" }}
                            />
                        )}
                    </Field>
                    <div style={{ color: "red" }}>
                        <ErrorMessage name="password" />
                    </div>

                    <Field name="newPassword">
                        {({ field }) => (
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                name="newPassword"
                                label="New Password"
                                type="password"
                                id="newPassword"
                                {...field}
                                style={{ width: "40%" }}
                            />
                        )}
                    </Field>
                    <div style={{ color: "red" }}>
                        <ErrorMessage name="newPassword" />
                    </div>

                    <Field name="confirmPassword">
                        {({ field }) => (
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                name="confirmPassword"
                                label="Confirm New Password"
                                type="password"
                                id="confirmPassword"
                                {...field}
                                style={{ width: "40%" }}
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
                                variant="contained"
                                color="secondary"
                                disabled={isSubmitting}
                                {...field}
                            >
                                Change Password
                            </Button>
                        )}
                    </Field>
                </Form>
            )}
        </Formik>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        changePassword: (password, newPassword) =>
            dispatch(userActions.changePassword(password, newPassword)),
    };
};

export default connect(null, mapDispatchToProps)(ChangePasswordForm);
