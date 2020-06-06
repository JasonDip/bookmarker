import React from "react";
import IconButton from "@material-ui/core/IconButton";
import CommentIcon from "@material-ui/icons/Comment";

const NoteButton = (props) => {
    const { clickHandler } = props;
    return (
        <IconButton
            style={props.style}
            color="primary"
            aria-label="notes"
            onClick={clickHandler}
        >
            <CommentIcon />
        </IconButton>
    );
};

export default NoteButton;
