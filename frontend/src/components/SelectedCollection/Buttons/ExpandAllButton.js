import React from "react";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";

import * as optionsDuck from "../../../redux/ducks/options";

const ExpandAllButton = (props) => {
    // from redux
    const { expandAll } = props;

    return (
        <Button
            variant="outlined"
            onClick={() => expandAll()}
            // startIcon={<UnfoldMoreIcon />}
            style={{ marginBottom: "15px" }}
        >
            <UnfoldMoreIcon />
        </Button>
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
    expandAll: optionsDuck.expandAll,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpandAllButton);
