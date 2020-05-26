import axios from "axios";

import * as bundleApi from "../../api/bundle";

export const GET_COLLECTIONS_PENDING = "GET_COLLECTIONS_PENDING";
export const GET_COLLECTIONS_SUCCESS = "GET_COLLECTIONS_SUCCESS";
export const GET_COLLECTIONS_FAIL = "GET_COLLECTIONS_FAIL";

export const getCollections = (bundleId) => {
    return (dispatch) => {
        dispatch({ type: GET_COLLECTIONS_PENDING });
        bundleApi
            .getCollection("5ecadee8e7263f4734bd1a0d")
            .then((res) => {
                dispatch({
                    type: GET_COLLECTIONS_SUCCESS,
                    payload: res.data,
                });
            })
            .catch((err) => {
                dispatch({
                    type: GET_COLLECTIONS_FAIL,
                    payload: err,
                });
            });
    };
};
