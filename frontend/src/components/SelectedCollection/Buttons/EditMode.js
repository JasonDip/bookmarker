import React from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import CreateIcon from "@material-ui/icons/Create";

import * as optionsActions from "../../../redux/ducks/options";

const EditMode = (props) => {
    // props from redux store
    const { editMode, setEditModeOn, setEditModeOff } = props;

    // edit button util
    const editModeClickHandler = () => {
        if (editMode) {
            setEditModeOff();
        } else {
            setEditModeOn();
        }
    };
    const editButtonColor = editMode ? "secondary" : "default";

    return (
        <Button
            color={editButtonColor}
            variant="contained"
            onClick={editModeClickHandler}
            style={{ marginBottom: "15px" }}
            startIcon={<CreateIcon />}
        >
            Edit Mode
        </Button>
    );
};

const mapStateToProps = (state) => {
    return {
        selectedCollection: state.selectedCollection,
        editMode: state.options.editMode,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setEditModeOn: () => dispatch(optionsActions.setEditModeOn()),
        setEditModeOff: () => dispatch(optionsActions.setEditModeOff()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditMode);
