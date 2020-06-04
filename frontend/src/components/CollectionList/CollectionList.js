import React from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AddBoxIcon from "@material-ui/icons/AddBox";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Button from "@material-ui/core/Button";

import * as selectedCollectionDuck from "../../redux/ducks/selectedCollection";
import * as userActions from "../../redux/actions/user";
import * as bundleActions from "../../redux/actions/bundle";
import { findByLabelText } from "@testing-library/react";

const useStyles = makeStyles({
    listHeader: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
});

const CollectionList = (props) => {
    // from redux
    const { collectionList, selectedCollection } = props;
    const classes = useStyles();

    return (
        <div style={{ maxWidth: "100%" }}>
            <Typography className={classes.listHeader}>
                <strong>Your Collections</strong>
                <IconButton color="primary">
                    <AddCircleOutlineIcon />
                </IconButton>
            </Typography>
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

            {/* show collectionList */}
            <div className={classes.drawerContainer}>
                <List>
                    {collectionList &&
                        collectionList.map((collection, index) => (
                            <ListItem
                                button
                                key={collection._id}
                                selected={
                                    selectedCollection &&
                                    selectedCollection.length > 0 &&
                                    selectedCollection[0]._id === collection._id
                                }
                            >
                                <Typography noWrap gutterBottom>
                                    {collection.name}
                                </Typography>
                            </ListItem>
                        ))}
                </List>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    collectionList: state.collectionList,
    selectedCollection: state.selectedCollection,
});

const mapDispatchToProps = (dispatch) => ({
    getCollection: (bundleId) =>
        dispatch(selectedCollectionDuck.getCollection(bundleId)),
    getUserInfo: () => dispatch(userActions.getUserInfo()),
    createRootBundle: (bundleObj) =>
        dispatch(bundleActions.createRootBundle(bundleObj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectionList);
