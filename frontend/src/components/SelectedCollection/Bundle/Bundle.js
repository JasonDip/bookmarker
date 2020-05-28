import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";

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

const Bundle = (props) => {
    const { collection, id } = props;

    const [expanded, setExpanded] = React.useState(
        collection.get(id)["isRoot"]
    );

    const panelClickHandler = () => {
        setExpanded((state) => !state);
    };

    return (
        <ExpansionPanel
            square
            expanded={expanded}
            onChange={panelClickHandler}
            style={{ width: "100%" }}
        >
            <ExpansionPanelSummary aria-controls="panel1d-content" id={id}>
                <Typography>
                    {collection.get(id)["name"]} {id}
                </Typography>
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
                        <Bundle collection={collection} id={childBundleId} />
                    );
                })}

                {/* optional padding if child bundles are rendered above */}
                {collection.get(id)["childBundleIds"].length > 0 && (
                    <div style={{ paddingTop: "16px" }} />
                )}

                {/* bookmarks */}
                {collection.get(id)["bookmarks"].map((bookmark) => {
                    return <Bookmark bookmark={{ ...bookmark }} />;
                })}
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};

export default Bundle;
