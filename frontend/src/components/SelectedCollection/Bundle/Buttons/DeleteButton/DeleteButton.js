import React from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

const DeleteButton = (props) => {
    const { clickHandler } = props;
    return (
        <IconButton
            // style={{ color: "red" }}
            color="secondary"
            aria-label="delete"
            onClick={clickHandler}
        >
            <DeleteOutlineIcon />
        </IconButton>
    );
};

export default DeleteButton;
