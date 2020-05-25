import axios from "axios";

export const GET_COLLECTIONS = "GET_COLLECTIONS";

export const getCollections = () => {
    return (dispatch) => {
        axios
            .get("http://localhost:3000/bundles/5ecadee8e7263f4734bd1a0d")
            .then((res) => {
                dispatch({
                    type: GET_COLLECTIONS,
                    payload: res.data,
                });
            });
    };
};
