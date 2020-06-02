import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff",
    },
}));

function SimpleBackdrop(props) {
    const classes = useStyles();

    return (
        <Backdrop className={classes.backdrop} open={props.loading}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
    };
};

export default connect(mapStateToProps, null)(SimpleBackdrop);
