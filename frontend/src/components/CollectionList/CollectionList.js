import React from "react";
import { connect } from "react-redux";

import * as selectedCollectionDuck from "../../redux/ducks/selectedCollection";
import * as userAction from "../../redux/actions/user";

const CollectionList = (props) => {
    return (
        <div style={{ maxWidth: "100%" }}>
            <p>list of collections</p>
            <button
                onClick={() => props.getCollection("5ecadee8e7263f4734bd1a0d")}
            >
                select a collection
            </button>

            <button onClick={() => props.getUserInfo()}>get user info</button>
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
    getUserInfo: () => dispatch(userAction.getUserInfo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectionList);
