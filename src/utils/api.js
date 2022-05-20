import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

api.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // console.log("INTERCEPTORS " + response.status);
    return response;
  }, function (error) {
    // console.log("ERROR RESPONSE INTERCEPTORS " + error.response.status);
    // if (error.response.status === 401) {
    //     window.location = '/';
    // }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export default api;