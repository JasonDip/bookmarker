import React from "react";
import { connect } from "react-redux";

import * as bookmarkerActions from "../../redux/reducers/bookmarker/actions";

const CollectionList = (props) => {
    return (
        <div style={{ maxWidth: "100%" }}>
            <p>list of collections</p>
            <button onClick={props.getCollections}>click</button>
            <p></p>
        </div>
    );
};

const mapStateToProps = (state) => ({
    collections: state.bookmarker.collections,
    selectedCollection: state.bookmarker.selectedCollection,
});

const mapDispatchToProps = (dispatch) => ({
    getCollections: () => dispatch(bookmarkerActions.getCollections()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectionList);
