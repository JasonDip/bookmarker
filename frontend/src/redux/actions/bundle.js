import * as bundleApi from "../api/bundle";
import * as userActions from "./user";

/* actions */
export const CREATE_NEW_COLLECTION_PENDING =
    "actions/bundle/CREATE_NEW_COLLECTION_PENDING";
export const CREATE_NEW_COLLECTION_SUCCESS =
    "actions/bundle/CREATE_NEW_COLLECTION_SUCCESS";
export const CREATE_NEW_COLLECTION_FAIL =
    "actions/bundle/CREATE_NEW_COLLECTION_FAIL";

/* reducer */

/* action creators */

/* thunks */
export const createRootBundle = (bundleObj) => {
    return (dispatch) => {
        dispatch({ type: CREATE_NEW_COLLECTION_PENDING });
        bundleApi
            .createRootBundle(bundleObj)
            .then((res) => {
                dispatch({ type: CREATE_NEW_COLLECTION_SUCCESS });
                // refresh collectionList
                dispatch(userActions.getUserInfo());
            })
            .catch((err) => {
                dispatch({
                    type: CREATE_NEW_COLLECTION_FAIL,
                    payload: err.response.data.error,
                });
            });
    };
};
