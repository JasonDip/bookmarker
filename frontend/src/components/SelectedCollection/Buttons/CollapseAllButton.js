import React from "react";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import UnfoldLessIcon from "@material-ui/icons/UnfoldLess";

import * as optionsDuck from "../../../redux/ducks/options";

const CollapseAllButton = (props) => {
    // from redux
    const { collapseAll } = props;

    return (
        <Button
            variant="outlined"
            onClick={() => collapseAll()}
            // startIcon={<UnfoldLessIcon />}
            style={{ marginBottom: "15px" }}
        >
            <UnfoldLessIcon />
        </Button>
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
    collapseAll: optionsDuck.collapseAll,
};

export default connect(mapStateToProps, mapDispatchToProps)(CollapseAllButton);
