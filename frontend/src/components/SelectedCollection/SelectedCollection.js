import React from "react";
import { connect } from "react-redux";

import { getCollections } from "../../redux/reducers/actions";
import Bundle from "./Bundle/Bundle";

const SelectedCollection = (props) => {
    // map the selected collection into a map for O(1) lookup
    let rootBundleId;
    let collection = new Map();
    let collectionDisplay;
    const { selectedCollection } = props;
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

    return <div>{collectionDisplay}</div>;
};

const mapStateToProps = (state) => {
    return {
        selectedCollection: state.bookmarker.selectedCollection,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCollections: () => dispatch(getCollections()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectedCollection);
