import * as userApi from "../api/user";

/* actions */
// get user info (id, name, email, ownedCollections)
export const GET_USER_INFO_PENDING = "actions/user/GET_USER_INFO_PENDING";
export const GET_USER_INFO_SUCCESS = "actions/user/GET_USER_INFO_SUCCESS";
export const GET_USER_INFO_FAIL = "actions/user/GET_USER_INFO_FAIL";
// create new user account
export const CREATE_NEW_USER_PENDING = "actions/user/CREATE_NEW_USER_PENDING";
export const CREATE_NEW_USER_SUCCESS = "actions/user/CREATE_NEW_USER_SUCCESS";
export const CREATE_NEW_USER_FAIL = "actions/user/CREATE_NEW_USER_FAIL";
// delete current logged in user
export const DELETE_USER_PENDING = "actions/user/DELETE_USER_PENDING";
export const DELETE_USER_SUCCESS = "actions/user/DELETE_USER_SUCCESS";
export const DELETE_USER_FAIL = "actions/user/DELETE_USER_FAIL";
// change current user's password
export const CHANGE_PASSWORD_PENDING = "actions/user/CHANGE_PASSWORD_PENDING";
export const CHANGE_PASSWORD_SUCCESS = "actions/user/CHANGE_PASSWORD_SUCCESS";
export const CHANGE_PASSWORD_FAIL = "actions/user/CHANGE_PASSWORD_FAIL";

/* thunks */
export const createNewUser = (userObj) => {
    return (dispatch) => {
        dispatch({ type: CREATE_NEW_USER_PENDING });
        userApi
            .createNewUser(userObj)
            .then((res) => {
                dispatch({ type: CREATE_NEW_USER_SUCCESS });
            })
            .catch((err) => {
                dispatch({ type: CREATE_NEW_USER_FAIL, payload: err });
            });
    };
};

export const deleteUser = (password) => {
    return (dispatch) => {
        dispatch({ type: DELETE_USER_PENDING });
        userApi
            .deleteUser(password)
            .then((res) => {
                dispatch({ type: DELETE_USER_SUCCESS });
            })
            .catch((err) => {
                dispatch({ type: DELETE_USER_FAIL, payload: err });
            });
    };
};

export const getUserInfo = () => {
    return (dispatch) => {
        dispatch({ type: GET_USER_INFO_PENDING });
        userApi
            .getUserInfo()
            .then((res) => {
                // save user info AND save ownedCollections to collectionList
                dispatch({ type: GET_USER_INFO_SUCCESS, payload: res.data });
            })
            .catch((err) => {
                dispatch({
                    type: GET_USER_INFO_FAIL,
                    payload: err,
                });
            });
    };
};

export const changePassword = (password, newPassword) => {
    return (dispatch) => {
        dispatch({ type: CHANGE_PASSWORD_PENDING });
        userApi
            .changePassword(password, newPassword)
            .then((res) => {
                dispatch({ type: CHANGE_PASSWORD_SUCCESS });
            })
            .catch((err) => {
                dispatch({ type: CHANGE_PASSWORD_FAIL, payload: err });
            });
    };
};
