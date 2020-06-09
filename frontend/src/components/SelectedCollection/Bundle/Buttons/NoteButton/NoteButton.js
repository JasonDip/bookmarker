import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";

const LargerToolTip = withStyles({
    tooltip: {
        fontSize: "1em",
        background: "#3f51b5",
    },
    arrow: {
        color: "#3f51b5",
    },
})(Tooltip);

const NoteButton = (props) => {
    return (
        <LargerToolTip
            title={
                <Typography style={{ whiteSpace: "pre-line" }}>
                    {props.note}
                </Typography>
            }
            arrow
            enterTouchDelay={10}
            leaveTouchDelay={3000}
        >
            <IconButton
                style={props.style}
                color="primary"
                aria-label="notes"
                // onClick={clickHandler}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}
            >
                <DescriptionOutlinedIcon />
            </IconButton>
        </LargerToolTip>
    );
};

export default NoteButton;
