export default function getAxiosConfig(data) {
    return {
        withCredentials: true,
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
        data,
    };
}
