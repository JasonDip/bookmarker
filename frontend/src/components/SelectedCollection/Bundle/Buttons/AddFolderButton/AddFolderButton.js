import React from "react";
import IconButton from "@material-ui/core/IconButton";
import CreateNewFolderOutlinedIcon from "@material-ui/icons/CreateNewFolderOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";

const LargerToolTip = withStyles({
    tooltip: {
        fontSize: "1em",
    },
})(Tooltip);

const AddFolderButton = (props) => {
    const { clickHandler } = props;
    return (
        <LargerToolTip title="Add Folder" arrow>
            <IconButton
                style={props.style}
                aria-label="add"
                onClick={clickHandler}
            >
                <CreateNewFolderOutlinedIcon />
            </IconButton>
        </LargerToolTip>
    );
};

export default AddFolderButton;
