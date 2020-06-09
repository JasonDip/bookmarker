import React from "react";
import { connect } from "react-redux";

import Typography from "@material-ui/core/Typography";

import DeleteAccountForm from "./DeleteAccountForm/DeleteAccountForm";
import ChangePasswordForm from "./ChangePasswordForm/ChangePasswordForm";

import * as userActions from "../../redux/actions/user";

const Profile = (props) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
            }}
        >
            <Typography variant="h5">Profile</Typography>
            <br />

            {/* change password */}
            <ChangePasswordForm />
            <br />
            <br />
            {/* delete account */}
            <DeleteAccountForm />
        </div>
    );
};

const mapDispatchToProps = {
    deleteUser: userActions.deleteUser,
};

export default connect(null, mapDispatchToProps)(Profile);
