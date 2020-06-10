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

const ModifyBookmarkModal = (props) => {
    // passed in from parent
    const { parentBundleId, bookmarkObj, open, setOpen } = props;
    // from redux
    const { modifyBookmark } = props;

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-modify-bookmark"
                fullWidth
            >
                <DialogTitle id="form-dialog-modify-bookmark">
                    Modify This Bookmark
                </DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={{
                            bookmarkName: bookmarkObj.name,
                            note: bookmarkObj.note,
                            url: bookmarkObj.url,
                        }}
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
                            modifyBookmark(parentBundleId, bookmarkObj._id, {
                                name: value.bookmarkName,
                                note: value.note,
                                url: value.url,
                            });
                            setSubmitting(false);
                            setOpen(false);
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
                                                Save
                                            </Button>
                                        )}
                                    </Field>
                                </DialogActions>
                            </Form>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>
        </>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        modifyBookmark: (bundleId, bookmarkId, bookmarkObj) =>
            dispatch(
                bookmarkActions.modifyBookmark(
                    bundleId,
                    bookmarkId,
                    bookmarkObj
                )
            ),
    };
};

export default connect(null, mapDispatchToProps)(ModifyBookmarkModal);
