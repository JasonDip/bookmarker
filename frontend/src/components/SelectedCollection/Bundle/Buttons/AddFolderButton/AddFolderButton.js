import React from "react";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import CreateNewFolderOutlinedIcon from "@material-ui/icons/CreateNewFolderOutlined";

const AddButton = (props) => {
    const { clickHandler } = props;
    return (
        <IconButton style={props.style} aria-label="add" onClick={clickHandler}>
            <CreateNewFolderOutlinedIcon />
        </IconButton>
    );
};

export default AddButton;
