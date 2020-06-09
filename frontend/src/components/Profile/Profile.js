import React from "react";
import { connect } from "react-redux";

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import * as userActions from "../../redux/actions/user";

const Profile = (props) => {
    // passed in by redux
    const { deleteUser } = props;

    const [deleteAccountPassword, setDeleteAccountPassword] = React.useState(
        ""
    );

    const deleteAccountHandler = (e) => {
        deleteUser(deleteAccountPassword);
        e.preventDefault();
        e.stopPropagation();
    };

    const deleteAccountPasswordChangeHandler = (e) => {
        setDeleteAccountPassword(e.target.value);
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
            }}
        >
            <Typography>
                <h2>Profile</h2>
            </Typography>
            <br />
            <br />

            {/* delete account */}
            <form
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                }}
                onSubmit={deleteAccountHandler}
            >
                <Typography>
                    <h3>Delete Account</h3>
                </Typography>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    // fullWidth
                    style={{ width: "40%" }}
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={deleteAccountPasswordChangeHandler}
                />
                <Button type="submit" color="secondary" variant="contained">
                    Delete Account
                </Button>
            </form>
        </div>
    );
};

const mapDispatchToProps = {
    deleteUser: userActions.deleteUser,
};

export default connect(null, mapDispatchToProps)(Profile);
