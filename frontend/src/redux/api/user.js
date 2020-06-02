import Axios from "axios";
import getAxiosConfig from "./getAxiosConfig";

const url = process.env.REACT_APP_API_URL;

export const getUserInfo = () => {
    return Axios.get(url + "/user", getAxiosConfig());
};
