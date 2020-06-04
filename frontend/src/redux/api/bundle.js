import Axios from "axios";
import getAxiosConfig from "./getAxiosConfig";

const url = process.env.REACT_APP_API_URL;

/* get a collection */
export const getCollection = (bundleId) => {
    return Axios.get(url + "/bundles/" + bundleId, getAxiosConfig());
};

/* create a new root bundle */
export const createRootBundle = (bundleObj) => {
    return Axios.post(url + "/bundles", bundleObj, getAxiosConfig());
};

/* modify a bundle */
export const modifyBundle = (bundleId, bundleObj) => {
    return Axios.patch(
        url + "/bundles/" + bundleId,
        bundleObj,
        getAxiosConfig()
    );
};
