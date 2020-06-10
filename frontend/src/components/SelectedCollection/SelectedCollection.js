import React from "react";
import { connect } from "react-redux";

import EditMode from "./Buttons/EditMode";
import ShareButton from "./Buttons/ShareButton";
import ExpandAllButton from "./Buttons/ExpandAllButton";
import CollapseAllButton from "./Buttons/CollapseAllButton";

import Bundle from "./Bundle/Bundle";

const SelectedCollection = (props) => {
    // props from redux store
    const { selectedCollection } = props;

    // optional prop for sharing view
    const { shareMode } = props;

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
            {collectionDisplay !== null && !shareMode && (
                <div style={{ display: "flex" }}>
                    {/* expand/collapse buttons */}
                    <ExpandAllButton />
                    <CollapseAllButton />

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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectedCollection);
