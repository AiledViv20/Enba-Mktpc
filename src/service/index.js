import axios from "axios";

export const api = ({ data, method, url, responseType }) => {
    return axios({
        baseURL: "https://enba.mx/",
        data,
        method,
        url,
        responseType,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.REACT_APP_TEST_STRIPE_SECRET_KEY}`,
        },
    })
}