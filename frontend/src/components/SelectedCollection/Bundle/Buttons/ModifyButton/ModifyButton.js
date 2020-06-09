import React from "react";
import IconButton from "@material-ui/core/IconButton";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";

const LargerToolTip = withStyles({
    tooltip: {
        fontSize: "1em",
    },
})(Tooltip);

const ModifyButton = (props) => {
    const { clickHandler } = props;
    return (
        <LargerToolTip title="Modify" arrow>
            <IconButton
                style={props.style}
                aria-label="modify"
                onClick={clickHandler}
            >
                <CreateOutlinedIcon />
            </IconButton>
        </LargerToolTip>
    );
};

export default ModifyButton;
