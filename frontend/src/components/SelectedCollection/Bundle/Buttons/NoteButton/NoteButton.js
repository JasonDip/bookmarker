import React from "react";
import IconButton from "@material-ui/core/IconButton";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";

const NoteButton = (props) => {
    const { clickHandler } = props;
    return (
        <IconButton
            style={props.style}
            color="primary"
            aria-label="notes"
            onClick={clickHandler}
        >
            <DescriptionOutlinedIcon />
        </IconButton>
    );
};

export default NoteButton;
