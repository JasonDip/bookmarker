import React from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import * as bundleActions from "../../redux/actions/bundle";

const useStyles = makeStyles((theme) => ({
    contentContainer: {
        width: "50vw",
    },
}));

const DeleteBundleModal = (props) => {
    // passed in from parent
    const { name, bundleId, open, setOpen } = props;
    // from redux
    const { deleteBundle } = props;

    const classses = useStyles();

    const handleClose = () => {
        setOpen(false);
    };

    const deleteHandler = () => {
        deleteBundle(bundleId);
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-delete-folder"
            >
                <DialogTitle id="form-dialog-delete-folder">
                    Delete a Folder
                </DialogTitle>
                <DialogContent className={classses.contentContainer}>
                    <DialogContentText>
                        Are you want to delete "{name}" and all the folders and
                        bookmarks it contains?
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
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteBundle: (bundleId) =>
            dispatch(bundleActions.deleteBundle(bundleId)),
    };
};

export default connect(null, mapDispatchToProps)(DeleteBundleModal);
