import React from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";

const LargerToolTip = withStyles({
    tooltip: {
        fontSize: "1em",
    },
})(Tooltip);

const DeleteButton = (props) => {
    const { clickHandler } = props;
    return (
        <LargerToolTip title="Delete" arrow>
            <IconButton
                color="secondary"
                aria-label="delete"
                onClick={clickHandler}
            >
                <DeleteOutlineIcon />
            </IconButton>
        </LargerToolTip>
    );
};

export default DeleteButton;
