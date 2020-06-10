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

import * as bookmarkActions from "../../redux/actions/bookmark";

const CreateBookmarkModal = (props) => {
    // passed in from parent
    const { setExpanded, parentBundleId, open, setOpen } = props;
    // from redux
    const { createBookmark } = props;

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-add-bookmark"
                fullWidth
            >
                <DialogTitle id="form-dialog-add-bookmark">
                    Add a Bookmark
                </DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={{ bookmarkName: "", note: "", url: "" }}
                        validationSchema={Yup.object({
                            bookmarkName: Yup.string(),
                            note: Yup.string(),
                            url: Yup.string().required("Required."),
                        })}
                        onSubmit={(value, { setSubmitting }) => {
                            if (value.bookmarkName.length === 0) {
                                value.bookmarkName = value.url;
                            }
                            // dispatch add nested bundle
                            createBookmark(parentBundleId, {
                                name: value.bookmarkName,
                                note: value.note,
                                url: value.url,
                            });
                            setSubmitting(false);
                            setOpen(false);
                            setExpanded(true);
                        }}
                    >
                        {({ isSubmitting, validateForm, onSubmit }) => (
                            <Form>
                                <Field name="url">
                                    {({ field }) => (
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="url"
                                            label="URL"
                                            name="url"
                                            {...field}
                                            autoFocus
                                        />
                                    )}
                                </Field>
                                <div style={{ color: "red" }}>
                                    <ErrorMessage name="url" />
                                </div>

                                <Field name="bookmarkName">
                                    {({ field }) => (
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            // required
                                            fullWidth
                                            id="bookmarkName"
                                            label="Bookmark Name"
                                            name="bookmarkName"
                                            {...field}
                                        />
                                    )}
                                </Field>
                                <div style={{ color: "red" }}>
                                    <ErrorMessage name="bookmarkName" />
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
        createBookmark: (bundleId, bookmarkObj) =>
            dispatch(bookmarkActions.createBookmark(bundleId, bookmarkObj)),
    };
};

export default connect(null, mapDispatchToProps)(CreateBookmarkModal);
