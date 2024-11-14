import axios from "axios";

const http = axios.create({
    url: "/api",
    baseURL: "/api",
    headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*"
    }
});

export default http;