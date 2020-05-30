import React from "react";
import IconButton from "@material-ui/core/IconButton";
import CreateIcon from "@material-ui/icons/Create";

const ModifyButton = (props) => {
    const { clickHandler } = props;
    return (
        <IconButton
            style={props.style}
            aria-label="modify"
            onClick={clickHandler}
        >
            <CreateIcon />
        </IconButton>
    );
};

export default ModifyButton;
