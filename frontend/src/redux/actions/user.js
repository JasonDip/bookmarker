import * as userApi from "../api/user";

/* actions */
export const GET_USER_INFO_PENDING = "actions/user/GET_USER_INFO_PENDING";
export const GET_USER_INFO_SUCCESS = "actions/user/GET_USER_INFO_SUCCESS";
export const GET_USER_INFO_FAIL = "actions/user/GET_USER_INFO_FAIL";

/* thunks */
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
