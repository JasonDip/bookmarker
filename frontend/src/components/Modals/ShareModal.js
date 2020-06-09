import React from "react";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import IconButton from "@material-ui/core/IconButton";

import * as bundleActions from "../../redux/actions/bundle";

const ShareModal = (props) => {
    // passed in from parent
    const { open, setOpen } = props;
    // from redux
    const { modifyBundle, selectedCollection } = props;

    const [isPrivate, setIsPrivate] = React.useState("");

    React.useEffect(() => {
        setIsPrivate(selectedCollection[0].isPrivate ? "PRIVATE" : "PUBLIC");
    }, [open, selectedCollection]);

    const getShareLink = () => {
        return (
            window.location.protocol +
            "//" +
            window.location.host +
            "/share/" +
            selectedCollection[0]._id
        );
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setIsPrivate(event.target.value);
    };

    const saveClickHandler = () => {
        // set privacy
        const privateState = isPrivate === "PRIVATE" ? true : false;
        modifyBundle(selectedCollection[0]._id, { isPrivate: privateState });

        setOpen(false);
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-share-collection"
                fullWidth
            >
                <DialogTitle id="form-dialog-share-collection">
                    Share Settings
                </DialogTitle>
                <DialogContent>
                    <h3>Collection Privacy</h3>
                    <RadioGroup
                        aria-label="collection-privacy"
                        name="collectionPrivacy"
                        value={isPrivate}
                        onChange={handleChange}
                    >
                        <FormControlLabel
                            value={"PRIVATE"}
                            control={<Radio />}
                            label="Private"
                        />
                        <FormControlLabel
                            value={"PUBLIC"}
                            control={<Radio />}
                            label="Public"
                        />
                    </RadioGroup>

                    <div style={{ display: "flex" }}>
                        <h3>Share Link</h3>
                        <IconButton
                            aria-label="copy-share-link"
                            onClick={() =>
                                navigator.clipboard.writeText(getShareLink())
                            }
                            color="primary"
                            disabled={isPrivate === "PRIVATE" ? true : false}
                        >
                            <FileCopyOutlinedIcon />
                        </IconButton>
                    </div>

                    <TextField
                        id="outlined-basic"
                        value={
                            isPrivate === "PRIVATE"
                                ? "Collection is private."
                                : getShareLink()
                        }
                        variant="outlined"
                        fullWidth
                        disabled={isPrivate === "PRIVATE" ? true : false}
                        InputProps={{
                            readOnly: true,
                        }}
                    />

                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={saveClickHandler}
                        >
                            Save
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        selectedCollection: state.selectedCollection,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        modifyBundle: (bundleId, bundleObj) =>
            dispatch(bundleActions.modifyBundle(bundleId, bundleObj)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShareModal);
