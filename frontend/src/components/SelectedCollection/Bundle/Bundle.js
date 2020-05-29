import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";

import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddIcon from "@material-ui/icons/Add";
import CommentIcon from "@material-ui/icons/Comment";
import CreateIcon from "@material-ui/icons/Create";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";

import Bookmark from "./Bookmark/Bookmark";

const ExpansionPanel = withStyles({
    root: {
        border: "1px solid rgba(0, 0, 0, .125)",
        boxShadow: "none",
        "&:before": {
            display: "none",
        },
        "&$expanded": {
            margin: "auto",
        },
    },
    expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
    root: {
        backgroundColor: "rgba(0, 0, 0, .03)",
        borderBottom: "1px solid rgba(0, 0, 0, .125)",
        marginBottom: -1,
        minHeight: 56,
        "&$expanded": {
            minHeight: 56,
        },
    },
    content: {
        "&$expanded": {
            margin: "12px 0",
        },
    },
    expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiExpansionPanelDetails);

// FOR POPOVER
const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
}));

const Bundle = (props) => {
    const { collection, id } = props;

    const [expanded, setExpanded] = React.useState(
        collection.get(id)["isRoot"]
    );

    const panelClickHandler = () => {
        setExpanded((state) => !state);
    };

    const addButtonHandler = (e) => {
        alert("add");
        e.stopPropagation();
        e.preventDefault();
    };

    const deleteButtonHandler = (e) => {
        alert("delete");
        e.stopPropagation();
        e.preventDefault();
    };

    const modifyButtonHandler = (e) => {
        alert("modify");
        e.stopPropagation();
        e.preventDefault();
    };

    // FOR POPOVER
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
        e.stopPropagation();
        e.preventDefault();
    };

    const handleClose = (e) => {
        setAnchorEl(null);
        e.stopPropagation();
        e.preventDefault();
    };

    const doNothingHandler = (e) => {
        e.stopPropagation();
        e.preventDefault();
    };

    const open = Boolean(anchorEl);
    const popid = open ? "simple-popover" : undefined;

    return (
        <ExpansionPanel
            square
            expanded={expanded}
            onChange={panelClickHandler}
            style={{ width: "100%" }}
        >
            <ExpansionPanelSummary
                aria-controls="panel-content"
                id={id}
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <Typography style={{ margin: "auto 0" }}>
                    {collection.get(id)["name"]} {id}
                </Typography>

                {/* notes for bundle */}
                <IconButton aria-label="delete" onClick={handleClick}>
                    <CommentIcon />
                </IconButton>
                <Popover
                    id={popid}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                    }}
                >
                    <Typography
                        className={classes.typography}
                        onClick={doNothingHandler}
                    >
                        The content of the Popover. The content of the Popover.
                        The content of the Popover. The content of the Popover.
                        The content of the Popover. The content of the Popover.
                        The content of the Popover.
                        <button>hey</button>
                    </Typography>
                </Popover>

                {/* add to bundle */}
                <IconButton
                    aria-label="add"
                    style={{ marginLeft: "auto" }}
                    onClick={addButtonHandler}
                >
                    <AddIcon />
                </IconButton>
                {/* modify bundle */}
                <IconButton aria-label="modify" onClick={modifyButtonHandler}>
                    <CreateIcon />
                </IconButton>
                {/* delete bundle */}
                <IconButton aria-label="delete" onClick={deleteButtonHandler}>
                    <DeleteOutlineIcon />
                </IconButton>
            </ExpansionPanelSummary>

            <ExpansionPanelDetails
                style={{
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {/* child bundles */}
                {collection.get(id)["childBundleIds"].map((childBundleId) => {
                    return (
                        <Bundle
                            key={childBundleId}
                            collection={collection}
                            id={childBundleId}
                        />
                    );
                })}

                {/* optional padding if child bundles are rendered above */}
                {collection.get(id)["childBundleIds"].length > 0 && (
                    <div style={{ paddingTop: "16px" }} />
                )}

                {/* bookmarks */}
                {collection.get(id)["bookmarks"].map((bookmark) => {
                    return (
                        <Bookmark
                            key={bookmark["_id"]}
                            bookmark={{ ...bookmark }}
                        />
                    );
                })}
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};

export default Bundle;
