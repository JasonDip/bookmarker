import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import SelectedCollection from "../SelectedCollection/SelectedCollection";

import * as selectedCollectionDuck from "../../redux/ducks/selectedCollection";

const Share = (props) => {
    // from link param
    const { bundleId } = useParams();

    // from redux
    const { getCollection } = props;

    React.useEffect(() => {
        getCollection(bundleId);
    }, [getCollection, bundleId]);

    return (
        <div>
            <SelectedCollection shareMode={true} />
        </div>
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
    getCollection: selectedCollectionDuck.getCollection,
};

export default connect(mapStateToProps, mapDispatchToProps)(Share);
