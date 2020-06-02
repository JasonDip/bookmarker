import Axios from "axios";
import axiosConfig from "./axiosConfig";

const url = process.env.REACT_APP_API_URL;

export const getUserInfo = () => {
    return Axios.get(url + "/user", axiosConfig);
};
