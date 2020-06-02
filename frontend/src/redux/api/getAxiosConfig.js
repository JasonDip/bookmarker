export default function getAxiosConfig() {
    return {
        withCredentials: true,
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
    };
}
