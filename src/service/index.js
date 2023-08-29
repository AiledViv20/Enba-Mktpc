import axios from "axios";

export const api = ({ data, method, url, responseType }) => {
    return axios({
        baseURL: "http://localhost:3000/",
        data,
        method,
        url,
        responseType
    })
}