import Axios from "axios";
import axiosConfig from "./axiosConfig";

const url = process.env.REACT_APP_API_URL;

/* get a collection */
export const getCollection = (bundleId) => {
    return Axios.get(url + "/bundles/" + bundleId);
};

/* create a new root bundle */
export const createRootBundle = (bundleObj) => {
    return Axios.post(url + "/bundles", bundleObj, axiosConfig);
};
