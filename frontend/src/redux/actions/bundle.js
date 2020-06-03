import * as bundleApi from "../api/bundle";
import * as userActions from "./user";
import * as selectedCollectionDuck from "../ducks/selectedCollection";

/* actions */
// create a new collection (root bundle)
export const CREATE_NEW_COLLECTION_PENDING =
    "actions/bundle/CREATE_NEW_COLLECTION_PENDING";
export const CREATE_NEW_COLLECTION_SUCCESS =
    "actions/bundle/CREATE_NEW_COLLECTION_SUCCESS";
export const CREATE_NEW_COLLECTION_FAIL =
    "actions/bundle/CREATE_NEW_COLLECTION_FAIL";
// modify a bundle
export const MODIFY_BUNDLE_PENDING = "actions/bundle/MODIFY_BUNDLE_PENDING";
export const MODIFY_BUNDLE_SUCCESS = "actions/bundle/MODIFY_BUNDLE_SUCCESS";
export const MODIFY_BUNDLE_FAIL = "actions/bundle/MODIFY_BUNDLE_FAIL";

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

export const modifyBundle = (bundleId, bundleObj) => {
    return (dispatch) => {
        dispatch({ type: MODIFY_BUNDLE_PENDING });
        bundleApi
            .modifyBundle(bundleId, bundleObj)
            .then((res) => {
                console.log(res);
                if (res.data.isRoot) {
                    // refresh the collection list
                    // TODO: refresh collection list
                    // and refresh selected collection if a root bundle was modified
                    dispatch(
                        selectedCollectionDuck.getCollection(res.data._id)
                    );
                } else {
                    // otherwise only refresh the selected collection
                    dispatch(
                        selectedCollectionDuck.getCollection(
                            res.data.rootBundleId
                        )
                    );
                }
            })
            .catch((err) => {
                return err.response.data.error;
            });
    };
};
