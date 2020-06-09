import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

import * as snackbarDuck from "../../redux/ducks/snackbar";

export const SNACKBAR_SEVERITY = {
    ERROR: "error",
    WARNING: "warning",
    INFO: "info",
    SUCCESS: "success",
};

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        "& > * + *": {
            marginTop: theme.spacing(2),
        },
    },
}));

const SnackBar = (props) => {
    const classes = useStyles();

    // from redux
    const { snackbarState, errorOff } = props;

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        errorOff();
    };

    return (
        <div className={classes.root}>
            <Snackbar
                open={snackbarState.showSnackBar}
                autoHideDuration={10000}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity={snackbarState.snackbarSeverity}
                >
                    {snackbarState.message}
                </Alert>
            </Snackbar>
            {/* <Alert severity="error">This is an error message!</Alert>
            <Alert severity="warning">This is a warning message!</Alert>
            <Alert severity="info">This is an information message!</Alert>
            <Alert severity="success">This is a success message!</Alert> */}
        </div>
    );
};

const mapStateToProps = (state) => ({
    snackbarState: state.snackbar,
});

const mapDispatchToProps = (dispatch) => {
    return {
        errorOff: () => dispatch(snackbarDuck.errorOff()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SnackBar);
