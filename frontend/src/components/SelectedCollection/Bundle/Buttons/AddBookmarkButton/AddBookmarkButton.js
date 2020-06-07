import React from "react";
import IconButton from "@material-ui/core/IconButton";
import BookmarksOutlinedIcon from "@material-ui/icons/BookmarksOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";

const LargerToolTip = withStyles({
    tooltip: {
        fontSize: "1em",
    },
})(Tooltip);

const AddBookmarkButton = (props) => {
    const { clickHandler } = props;
    return (
        <LargerToolTip title="Add Bookmark" arrow>
            <IconButton
                style={props.style}
                aria-label="add"
                onClick={clickHandler}
            >
                <BookmarksOutlinedIcon />
            </IconButton>
        </LargerToolTip>
    );
};

export default AddBookmarkButton;
