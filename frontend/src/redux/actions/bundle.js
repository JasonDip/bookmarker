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
// create nested bundle
export const CREATE_NESTED_BUNDLE_PENDING =
    "actions/bundle/CREATE_NESTED_BUNDLE_PENDING";
export const CREATE_NESTED_BUNDLE_SUCCESS =
    "actions/bundle/CREATE_NESTED_BUNDLE_SUCCESS";
export const CREATE_NESTED_BUNDLE_FAIL =
    "actions/bundle/CREATE_NESTED_BUNDLE_FAIL";
// delete bundle
export const DELETE_BUNDLE_PENDING = "actions/bundle/DELETE_BUNDLE_PENDING";
export const DELETE_BUNDLE_SUCCESS = "actions/bundle/DELETE_BUNDLE_SUCCESS";
export const DELETE_BUNDLE_FAIL = "actions/bundle/DELETE_BUNDLE_FAIL";

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
                // select the newly created collection
                dispatch(selectedCollectionDuck.getCollection(res.data._id));
            })
            .catch((err) => {
                dispatch({
                    type: CREATE_NEW_COLLECTION_FAIL,
                    payload: err,
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
                dispatch({ type: MODIFY_BUNDLE_SUCCESS });
                if (res.data.isRoot) {
                    // refresh the collection list
                    dispatch(userActions.getUserInfo());
                    // and refresh selected collection
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
                dispatch({ type: MODIFY_BUNDLE_FAIL, payload: err });
            });
    };
};

export const createNestedBundle = (bundleId, bundleObj) => {
    return (dispatch) => {
        dispatch({ type: CREATE_NESTED_BUNDLE_PENDING });
        bundleApi
            .createNestedBundle(bundleId, bundleObj)
            .then((res) => {
                dispatch({ type: CREATE_NESTED_BUNDLE_SUCCESS });
                // refresh currently selected collection
                dispatch(
                    selectedCollectionDuck.getCollection(res.data.rootBundleId)
                );
            })
            .catch((err) => {
                dispatch({ type: CREATE_NESTED_BUNDLE_FAIL, payload: err });
            });
    };
};

export const deleteBundle = (bundleId) => {
    return (dispatch) => {
        dispatch({ type: DELETE_BUNDLE_PENDING });
        bundleApi
            .deleteBundle(bundleId)
            .then((res) => {
                dispatch({ type: DELETE_BUNDLE_SUCCESS });
                if (res.data.isRoot) {
                    // if deleting a root bundle, clear the selectedCollection
                    dispatch(selectedCollectionDuck.clearSelectedCollection());
                    // refresh the collection list
                    dispatch(userActions.getUserInfo());
                } else {
                    // otherwise, refresh the selectedCollection
                    dispatch(
                        selectedCollectionDuck.getCollection(
                            res.data.rootBundleId
                        )
                    );
                }
            })
            .catch((err) => {
                dispatch({ type: DELETE_BUNDLE_FAIL, payload: err });
            });
    };
};
