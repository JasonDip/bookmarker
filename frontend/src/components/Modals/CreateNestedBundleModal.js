import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import * as bundleActions from "../../redux/actions/bundle";

const CreateNestedBundleModal = (props) => {
    // passed in from parent
    const { setExpanded, parentBundleId, open, setOpen } = props;
    // from redux
    const { createNestedBundle } = props;

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-add-nested-folder"
                fullWidth
            >
                <DialogTitle id="form-dialog-add-nested-folder">
                    Add a Folder
                </DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={{ folderName: "", note: "" }}
                        validationSchema={Yup.object({
                            folderName: Yup.string().required("Required."),
                            note: Yup.string(),
                        })}
                        onSubmit={(value, { setSubmitting }) => {
                            // dispatch add nested bundle
                            createNestedBundle(parentBundleId, {
                                name: value.folderName,
                                note: value.note,
                            });
                            setSubmitting(false);
                            setOpen(false);
                            setExpanded(true);
                        }}
                    >
                        {({ isSubmitting, validateForm, onSubmit }) => (
                            <Form>
                                <Field name="folderName">
                                    {({ field }) => (
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="folderName"
                                            label="Folder Name"
                                            name="folderName"
                                            {...field}
                                        />
                                    )}
                                </Field>
                                <div style={{ color: "red" }}>
                                    <ErrorMessage name="folderName" />
                                </div>

                                <Field name="note">
                                    {({ field }) => (
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            id="note"
                                            label="Note"
                                            name="note"
                                            multiline
                                            {...field}
                                        />
                                    )}
                                </Field>

                                <DialogActions>
                                    <Button
                                        onClick={handleClose}
                                        color="primary"
                                    >
                                        Cancel
                                    </Button>
                                    <Field name="submitButton">
                                        {({ field, form, meta }) => (
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                disabled={isSubmitting}
                                                {...field}
                                            >
                                                Add
                                            </Button>
                                        )}
                                    </Field>
                                </DialogActions>
                            </Form>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        createNestedBundle: (bundleId, bundleObj) =>
            dispatch(bundleActions.createNestedBundle(bundleId, bundleObj)),
    };
};

export default connect(null, mapDispatchToProps)(CreateNestedBundleModal);
