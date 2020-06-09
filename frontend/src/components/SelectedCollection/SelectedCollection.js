import React from "react";
import { connect } from "react-redux";

import EditMode from "./Buttons/EditMode";
import ShareButton from "./Buttons/ShareButton";

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
    let rootIsPrivate;
    let collection = new Map();
    let collectionDisplay = null;
    selectedCollection.forEach((bundle) => {
        collection.set(bundle["_id"], { ...bundle });
        if (bundle["isRoot"] === true) {
            rootBundleId = bundle["_id"];
            rootIsPrivate = bundle.isPrivate;
        }
    });
    // create the display for the selected collection
    if (collection.size > 0) {
        collectionDisplay = (
            <Bundle collection={collection} id={rootBundleId} />
        );
    }

    return (
        <div>
            {/* edit mode button */}
            {collectionDisplay !== null && (
                <div style={{ display: "flex" }}>
                    {/* edit mode button */}
                    <EditMode />

                    {/* share button */}
                    <ShareButton
                        rootBundleId={rootBundleId}
                        isPrivate={rootIsPrivate}
                    />
                </div>
            )}

            {/* show selected collection */}
            {collectionDisplay}
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SelectedCollection);
