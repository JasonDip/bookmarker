import React from "react";
import { SNACKBAR_SEVERITY } from "../../components/SnackBar/SnackBar";
import { Link } from "react-router-dom";

import * as bundleActions from "../actions/bundle";
import * as userActions from "../actions/user";
import * as authenticationDuck from "./authentication";
import * as selectedCollectionDuck from "./selectedCollection";
import * as bookmarkActions from "../actions/bookmark";

/* actions */
const ERROR_ON = "ducks/error/ERROR_ON";
const ERROR_OFF = "ducks/error/ERROR_OFF";

/* reducer */
const defaultError = {
    state: false,
    message: "",
    showSnackBar: false,
    snackbarSeverity: SNACKBAR_SEVERITY.ERROR,
};
export default function reducer(state = defaultError, action) {
    switch (action.type) {
        case userActions.CREATE_NEW_USER_SUCCESS:
            return {
                state: false,
                message: (
                    <>
                        Registration successful! Continue to the{" "}
                        <Link to="/login">Login</Link> page.
                    </>
                ),
                showSnackBar: true,
                snackbarSeverity: SNACKBAR_SEVERITY.SUCCESS,
            };
        case ERROR_ON:
        case bundleActions.CREATE_NEW_COLLECTION_FAIL:
        case bundleActions.MODIFY_BUNDLE_FAIL:
        case bundleActions.CREATE_NESTED_BUNDLE_FAIL:
        case userActions.GET_USER_INFO_FAIL:
        case userActions.CREATE_NEW_USER_FAIL:
        case authenticationDuck.LOGIN_FAIL:
        case authenticationDuck.LOGOUT_FAIL:
        case selectedCollectionDuck.GET_COLLECTION_FAIL:
        case bookmarkActions.CREATE_BOOKMARK_FAIL:
        case bookmarkActions.MODIFY_BOOKMARK_FAIL:
            // console.log(action.payload.response);
            // console.log(
            //     `Error ${action.payload.response.status}: ${action.payload.response.statusText}`
            // );
            let errorMessage;
            try {
                console.log(
                    `Error ${action.payload.response.data.error.status} - ${action.payload.response.data.error.name}: ${action.payload.response.data.error.message}`
                );
                errorMessage = `Error - ${action.payload.response.data.error.message}`;
            } catch {
                errorMessage = "Unknown error.";
            }
            return {
                state: true,
                message: errorMessage,
                showSnackBar: true,
                snackbarSeverity: SNACKBAR_SEVERITY.ERROR,
            };

        case ERROR_OFF:
        default:
            return {
                ...defaultError,
                snackbarSeverity: state.snackbarSeverity,
            };
    }
}

/* action creator */
export const errorOn = () => {
    return { type: ERROR_ON };
};

export const errorOff = () => {
    return { type: ERROR_OFF };
};
