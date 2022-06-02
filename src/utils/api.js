import axios from "axios";
import Cookie from "js-cookie";

const api = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token = Cookie.get('token');
    if(token){
        config.headers.common.Authorization = `Bearer ${token}`;
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

export default api;