import * as bookmarkApi from "../api/bookmark";
import * as selectedCollectionDuck from "../ducks/selectedCollection";

/* actions */
// create a bookmark
export const CREATE_BOOKMARK_PENDING =
    "actions/bookmark/CREATE_BOOKMARK_PENDING";
export const CREATE_BOOKMARK_SUCCESS =
    "actions/bookmark/CREATE_BOOKMARK_SUCCESS";
export const CREATE_BOOKMARK_FAIL = "actions/bookmark/CREATE_BOOKMARK_FAIL";
// modify a bookmark
export const MODIFY_BOOKMARK_PENDING =
    "actions/bookmark/MODIFY_BOOKMARK_PENDING";
export const MODIFY_BOOKMARK_SUCCESS =
    "actions/bookmark/MODIFY_BOOKMARK_SUCCESS";
export const MODIFY_BOOKMARK_FAIL = "actions/bookmark/MODIFY_BOOKMARK_FAIL";
// delete a bookmark
export const DELETE_BOOKMARK_PENDING =
    "actions/bookmark/DELETE_BOOKMARK_PENDING";
export const DELETE_BOOKMARK_SUCCESS =
    "actions/bookmark/DELETE_BOOKMARK_SUCCESS";
export const DELETE_BOOKMARK_FAIL = "actions/bookmark/DELETE_BOOKMARK_FAIL";

/* thunks */
export const createBookmark = (bundleId, bookmarkObj) => {
    return (dispatch) => {
        dispatch({ type: CREATE_BOOKMARK_PENDING });
        bookmarkApi
            .createBookmark(bundleId, bookmarkObj)
            .then((res) => {
                dispatch({ type: CREATE_BOOKMARK_SUCCESS });
                // refresh selectedCollection
                dispatch(
                    selectedCollectionDuck.getCollection(
                        res.data.topCollectionId
                    )
                );
            })
            .catch((err) => {
                dispatch({ type: CREATE_BOOKMARK_FAIL, payload: err });
            });
    };
};

export const modifyBookmark = (bundleId, bookmarkId, bookmarkObj) => {
    return (dispatch) => {
        dispatch({ type: MODIFY_BOOKMARK_PENDING });
        bookmarkApi
            .modifyBookmark(bundleId, bookmarkId, bookmarkObj)
            .then((res) => {
                dispatch({ type: MODIFY_BOOKMARK_SUCCESS });
                // refresh selected collection
                dispatch(
                    selectedCollectionDuck.getCollection(res.data.rootBundleId)
                );
            })
            .catch((err) => {
                dispatch({ type: MODIFY_BOOKMARK_FAIL, payload: err });
            });
    };
};

export const deleteBookmark = (bundleId, bookmarkId) => {
    return (dispatch) => {
        dispatch({ type: DELETE_BOOKMARK_PENDING });
        bookmarkApi
            .deleteBookmark(bundleId, bookmarkId)
            .then((res) => {
                dispatch({ type: DELETE_BOOKMARK_SUCCESS });
                // refresh selected collection
                dispatch(
                    selectedCollectionDuck.getCollection(res.data.rootBundleId)
                );
            })
            .ccatch((err) => {
                dispatch({ type: DELETE_BOOKMARK_FAIL, payload: err });
            });
    };
};
