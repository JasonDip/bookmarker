import React from "react";
import Popover from "@material-ui/core/Popover";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
}));

const PopOver = (props) => {
    const { anchorEl, setAnchorEl } = props;

    const classes = useStyles();

    const handleClose = (e) => {
        setAnchorEl(null);
        e.stopPropagation();
        e.preventDefault();
    };

    const doNothingHandler = (e) => {
        e.stopPropagation();
        e.preventDefault();
    };

    const open = Boolean(anchorEl);

    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "center",
            }}
        >
            <Typography
                className={classes.typography}
                onClick={doNothingHandler}
            >
                {props.children}
            </Typography>
        </Popover>
    );
};

export default PopOver;
