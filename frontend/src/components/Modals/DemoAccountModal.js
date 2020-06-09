import React from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const DemoAccountModal = (props) => {
    // passed in from parent
    const { open, setOpen } = props;

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-demo-account-warning"
                fullWidth
            >
                <DialogTitle id="form-dialog-demo-account-warning">
                    Demo Account Warning
                </DialogTitle>
                <DialogContent>
                    <DialogContentText style={{ whiteSpace: "pre-line" }}>
                        {`This demo account is provided to allow quick access for those who just want to try out the application.
                        
                        This demo account is open to the public.
                        The data stored on this account is not moderated.
                        The data stored on this account can change at any time.
                        
                        To make your own account, go to the Sign Up page.`}
                    </DialogContentText>

                    <DialogActions>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={handleClose}
                        >
                            Close
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default DemoAccountModal;
