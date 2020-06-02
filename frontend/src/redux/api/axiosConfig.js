export default {
    withCredentials: true,
    headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
    },
};
