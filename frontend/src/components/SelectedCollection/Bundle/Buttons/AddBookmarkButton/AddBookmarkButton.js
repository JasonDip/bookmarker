import React from "react";
import IconButton from "@material-ui/core/IconButton";
import BookmarksOutlinedIcon from "@material-ui/icons/BookmarksOutlined";

const AddBookmarkButton = (props) => {
    const { clickHandler } = props;
    return (
        <IconButton style={props.style} aria-label="add" onClick={clickHandler}>
            <BookmarksOutlinedIcon />
        </IconButton>
    );
};

export default AddBookmarkButton;
