import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";

import PopOver from "../../PopOver/PopOver";
import Bookmark from "./Bookmark/Bookmark";
import NoteButton from "./Buttons/NoteButton/NoteButton";
import AddButton from "./Buttons/AddButton/AddButton";
import ModifyButton from "./Buttons/ModifyButton/ModifyButton";
import DeleteButton from "./Buttons/DeleteButton/DeleteButton";

import * as bundleActions from "../../../redux/actions/bundle";

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

const Bundle = (props) => {
    // passed in
    const { collection, id } = props;
    // from redux
    const { editMode, modifyBundle, deleteBundle } = props;
    const thisBundle = collection.get(id);

    const [expanded, setExpanded] = React.useState(thisBundle["isRoot"]);

    const panelClickHandler = () => {
        setExpanded((state) => !state);
    };

    const addButtonHandler = (e) => {
        alert("add " + id);
        e.stopPropagation();
        e.preventDefault();
    };

    const deleteButtonHandler = (e) => {
        deleteBundle(id);
        e.stopPropagation();
        e.preventDefault();
    };

    const modifyButtonHandler = (e) => {
        modifyBundle(thisBundle["_id"], { name: Math.random() });
        e.stopPropagation();
        e.preventDefault();
    };

    // for notes popover
    const [anchorEl, setAnchorEl] = React.useState(null);
    const popoverClickHandler = (e) => {
        setAnchorEl(e.currentTarget);
        e.stopPropagation();
        e.preventDefault();
    };

    return (
        <ExpansionPanel
            square
            expanded={expanded}
            onChange={panelClickHandler}
            style={{ width: "100%" }}
        >
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel-content"
                id={id}
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                {/* title */}
                <Typography style={{ margin: "auto 0" }}>
                    {thisBundle["name"]} {id}
                </Typography>

                {/* notes for bundle */}
                {thisBundle["note"].length > 0 && (
                    <>
                        <NoteButton clickHandler={popoverClickHandler} />
                        <PopOver anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
                            {thisBundle["note"]}
                        </PopOver>
                    </>
                )}

                {editMode && (
                    <>
                        {/* add to bundle */}
                        <AddButton
                            style={{ marginLeft: "auto" }}
                            clickHandler={addButtonHandler}
                        />
                        {/* modify bundle */}
                        <ModifyButton clickHandler={modifyButtonHandler} />
                        {/* delete bundle */}
                        <DeleteButton clickHandler={deleteButtonHandler} />
                    </>
                )}
            </ExpansionPanelSummary>

            <ExpansionPanelDetails
                style={{
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {/* recursively populate child bundles */}
                {thisBundle["childBundleIds"].map((childBundleId) => {
                    return (
                        <Bundle
                            key={childBundleId}
                            collection={collection}
                            id={childBundleId}
                            editMode={editMode}
                            modifyBundle={modifyBundle}
                            deleteBundle={deleteBundle}
                        />
                    );
                })}

                {/* optional padding added if child bundles are rendered above */}
                {thisBundle["childBundleIds"].length > 0 && (
                    <div style={{ paddingTop: "16px" }} />
                )}

                {/* bookmarks */}
                {thisBundle["bookmarks"].map((bookmark) => {
                    return (
                        <Bookmark
                            key={bookmark["_id"]}
                            bookmark={{ ...bookmark }}
                            editMode={editMode}
                        />
                    );
                })}
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};

const mapStateToProps = (state) => {
    return {
        editMode: state.options.editMode,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        modifyBundle: (bundleId, bundleObj) =>
            dispatch(bundleActions.modifyBundle(bundleId, bundleObj)),
        deleteBundle: (bundleId) =>
            dispatch(bundleActions.deleteBundle(bundleId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bundle);
