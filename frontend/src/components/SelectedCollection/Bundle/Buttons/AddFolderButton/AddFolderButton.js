import React from "react";
import IconButton from "@material-ui/core/IconButton";
import CreateNewFolderOutlinedIcon from "@material-ui/icons/CreateNewFolderOutlined";

const AddFolderButton = (props) => {
    const { clickHandler } = props;
    return (
        <IconButton style={props.style} aria-label="add" onClick={clickHandler}>
            <CreateNewFolderOutlinedIcon />
        </IconButton>
    );
};

export default AddFolderButton;
