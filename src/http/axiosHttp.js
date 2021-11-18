import {getSession} from "../session/Session";
import {env} from "../configs/EnvironmentConfig";

const axios = require('axios').default;

const axiosHttp = axios.create({
  baseURL: env.API_ENDPOINT_URL,
  headers: {
    "Authorization"                     : 'Bearer ' + getSession(),
    'Content-Type'                      : 'application/json',
    "Accept"                            : 'application/json',
    "Access-Control-Allow-Origin"       : "*",
  },
});

axiosHttp.interceptors.request.use(
  (request) => {
    console.log(request);
    return request;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

axiosHttp.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default axiosHttp;
