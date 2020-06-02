import React from "react";
import { connect } from "react-redux";

import * as selectedCollectionDuck from "../../redux/ducks/selectedCollection";

const CollectionList = (props) => {
    return (
        <div style={{ maxWidth: "100%" }}>
            <p>list of collections</p>
            <button
                onClick={() => props.getCollection("5ecadee8e7263f4734bd1a0d")}
            >
                click
            </button>
            <p></p>
        </div>
    );
};

const mapStateToProps = (state) => ({
    collections: state.collectionList.collectionList,
    selectedCollection: state.selectedCollection.selectedCollection,
});

const mapDispatchToProps = (dispatch) => ({
    getCollection: (bundleId) =>
        dispatch(selectedCollectionDuck.getCollection(bundleId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectionList);
