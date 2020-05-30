import React from "react";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";

const AddButton = (props) => {
    const { clickHandler } = props;
    return (
        <IconButton style={props.style} aria-label="add" onClick={clickHandler}>
            <AddIcon />
        </IconButton>
    );
};

export default AddButton;
