import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import * as userActions from "../redux/actions/user";

// material ui components
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
// project components
import NavBar from "./NavBar/NavBar";
import CollectionList from "./CollectionList/CollectionList";
import SelectedCollection from "./SelectedCollection/SelectedCollection";
import Login from "./Login/Login";
import Loading from "./Loading/Loading";

const drawerWidth = "30%";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: "auto",
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

function App(props) {
    const classes = useStyles();

    // check if credentials are valid
    const { getUserInfo } = props;
    useEffect(() => {
        getUserInfo();
    }, [getUserInfo]);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Loading />
            <NavBar />

            {/* if already logged in, redirect to main page */}
            <Route path="/login">
                {props.authentication.id === null ? (
                    <Login />
                ) : (
                    <Redirect to="/" />
                )}
            </Route>

            {/* based on user id in store, go to login page or main page */}
            <Route path="/" exact>
                {props.authentication.id === null ? (
                    <Redirect to="/login" />
                ) : (
                    <>
                        <Drawer
                            className={classes.drawer}
                            variant="permanent"
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                        >
                            <Toolbar />
                            <div className={classes.drawerContainer}>
                                <CollectionList />
                            </div>
                        </Drawer>

                        <main className={classes.content}>
                            <Toolbar />
                            <SelectedCollection />
                        </main>
                    </>
                )}
            </Route>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        authentication: state.authentication,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUserInfo: () => dispatch(userActions.getUserInfo()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
