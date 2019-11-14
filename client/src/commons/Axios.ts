import axios from "axios";

const instance = (method: string) =>
    axios.create({
        baseURL: process.env.REACT_APP_BASE_SERVER_URL + method + "/",
        headers: {
            "Content-Type": "application/json",
            "x-auth": "cmklFinance"
        }
    });

export default instance;
