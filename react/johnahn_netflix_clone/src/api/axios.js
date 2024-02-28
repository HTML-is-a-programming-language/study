import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: "7eb2436d67753ae83287e2159576ffe2",
        language: "ko-KR",
    },
});

export default instance;