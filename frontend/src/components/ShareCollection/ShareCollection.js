import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

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
            <Grid container>
                <Grid item xs={0} md={2} lg={3} />
                <Grid item xs={12} md={8} lg={6}>
                    <SelectedCollection shareMode={true} />
                </Grid>
                <Grid item xs={0} md={2} lg={3} />
            </Grid>
        </div>
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
    getCollection: selectedCollectionDuck.getCollection,
};

export default connect(mapStateToProps, mapDispatchToProps)(Share);
