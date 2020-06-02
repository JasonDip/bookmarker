import React from "react";
import { connect } from "react-redux";

import * as selectedCollectionDuck from "../../redux/ducks/selectedCollection";
import * as userActions from "../../redux/actions/user";
import * as bundleActions from "../../redux/actions/bundle";

const CollectionList = (props) => {
    return (
        <div style={{ maxWidth: "100%" }}>
            <p>Your Collections</p>
            <button
                onClick={() =>
                    props.createRootBundle({
                        name: "root bundle from ui",
                        note: "my note",
                        bookmarks: {
                            name: "hi",
                            url: "google.com",
                            note: "bm note",
                        },
                    })
                }
            >
                Add New Collection
            </button>

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
    getUserInfo: () => dispatch(userActions.getUserInfo()),
    createRootBundle: (bundleObj) =>
        dispatch(bundleActions.createRootBundle(bundleObj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectionList);
