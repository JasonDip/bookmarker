import React from "react";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import * as bookmarkActions from "../../redux/actions/bookmark";

const DeleteBookmarkModal = (props) => {
    // passed in from parent
    const { name, bundleId, bookmarkId, open, setOpen } = props;
    // from redux
    const { deleteBookmark } = props;

    const handleClose = () => {
        setOpen(false);
    };

    const deleteHandler = () => {
        deleteBookmark(bundleId, bookmarkId);
        setOpen(false);
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-delete-folder"
                fullWidth
            >
                <DialogTitle id="form-dialog-delete-folder">
                    Delete This Bookmark
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you want to delete "{name}"?
                    </DialogContentText>

                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button
                            onClick={deleteHandler}
                            color="primary"
                            variant="contained"
                        >
                            Delete
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteBookmark: (bundleId, bookmarkId) =>
            dispatch(bookmarkActions.deleteBookmark(bundleId, bookmarkId)),
    };
};

export default connect(null, mapDispatchToProps)(DeleteBookmarkModal);
