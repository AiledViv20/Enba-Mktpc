import axios from "axios";

export const api = ({ data, method, url, responseType }) => {
    return axios({
        baseURL: "http://localhost:4005/",
        data,
        method,
        url,
        responseType
    })
}