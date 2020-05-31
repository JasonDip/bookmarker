import React from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import CreateIcon from "@material-ui/icons/Create";

import * as optionsActions from "../../redux/ducks/options";
import Bundle from "./Bundle/Bundle";

const SelectedCollection = (props) => {
    // props from redux store
    const {
        selectedCollection,
        editMode,
        setEditModeOn,
        setEditModeOff,
    } = props;

    // map the selected collection into a map for O(1) lookup
    let rootBundleId;
    let collection = new Map();
    let collectionDisplay = null;
    selectedCollection.forEach((bundle) => {
        collection.set(bundle["_id"], { ...bundle });
        if (bundle["isRoot"] === true) {
            rootBundleId = bundle["_id"];
        }
    });
    // create the display for the selected collection
    if (collection.size > 0) {
        collectionDisplay = (
            <Bundle collection={collection} id={rootBundleId} />
        );
    }

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
        <div>
            {/* edit mode button */}
            {collectionDisplay !== null && (
                <Button
                    color={editButtonColor}
                    variant="contained"
                    onClick={editModeClickHandler}
                    style={{ marginBottom: "10px" }}
                    startIcon={<CreateIcon />}
                >
                    Edit Mode
                </Button>
            )}

            {/* show selected collection */}
            {collectionDisplay}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        selectedCollection: state.bookmarker.selectedCollection,
        editMode: state.options.editMode,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setEditModeOn: () => dispatch(optionsActions.setEditModeOn()),
        setEditModeOff: () => dispatch(optionsActions.setEditModeOff()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectedCollection);
