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

/* 
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Button from "@material-ui/core/Button";

<div className={classes.drawerContainer}>
                    <List>
                        {["Inbox", "Starred", "Send email", "Drafts"].map(
                            (text, index) => (
                                <ListItem button key={text}>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? (
                                            <InboxIcon />
                                        ) : (
                                            <MailIcon />
                                        )}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItem>
                            )
                        )}
                    </List>
                    <Divider />
                    <List>
                        {["All mail", "Trash", "Spam"].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    {index % 2 === 0 ? (
                                        <InboxIcon />
                                    ) : (
                                        <MailIcon />
                                    )}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {["All mail", "Trash", "Spam"].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    {index % 2 === 0 ? (
                                        <InboxIcon />
                                    ) : (
                                        <MailIcon />
                                    )}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {["All mail", "Trash", "Spam"].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    {index % 2 === 0 ? (
                                        <InboxIcon />
                                    ) : (
                                        <MailIcon />
                                    )}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {["All mail", "Trash", "Spam"].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    {index % 2 === 0 ? (
                                        <InboxIcon />
                                    ) : (
                                        <MailIcon />
                                    )}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {["All mail", "Trash", "Spam"].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    {index % 2 === 0 ? (
                                        <InboxIcon />
                                    ) : (
                                        <MailIcon />
                                    )}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {["All mail", "Trash", "Spam"].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    {index % 2 === 0 ? (
                                        <InboxIcon />
                                    ) : (
                                        <MailIcon />
                                    )}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {["All mail", "Trash", "Spam"].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    {index % 2 === 0 ? (
                                        <InboxIcon />
                                    ) : (
                                        <MailIcon />
                                    )}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {["All mail", "Trash", "Spam"].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    {index % 2 === 0 ? (
                                        <InboxIcon />
                                    ) : (
                                        <MailIcon />
                                    )}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {["All mail", "Trash", "Spam"].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    {index % 2 === 0 ? (
                                        <InboxIcon />
                                    ) : (
                                        <MailIcon />
                                    )}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {["All mail", "Trash", "Spam"].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    {index % 2 === 0 ? (
                                        <InboxIcon />
                                    ) : (
                                        <MailIcon />
                                    )}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </div> */
