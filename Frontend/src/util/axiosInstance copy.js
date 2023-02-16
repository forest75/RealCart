import axios from "axios";
import Cookies from "js-cookie";

let isRefreshing = false;
let refreshSubscribers = [];

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;

    // eslint-disable-next-line no-underscore-dangle
    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshSubscribers.push((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(axios(originalRequest));
          });
        });
      }

      // eslint-disable-next-line no-underscore-dangle
      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise((resolve, reject) => {
        const refreshToken = Cookies.get("refresh_token");
        // Make a request to the backend to refresh the access token using the refresh token
        axios
          .post(`${process.env.REACT_APP_BACKEND_URL}/accounts/auth/refresh`, {
            refresh_token: refreshToken,
          })
          .then((response) => {
            const newAccessToken = response.data.body.token;
            localStorage.setItem("access-token", newAccessToken);
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            resolve(axios(originalRequest));
            refreshSubscribers = [];
          })
          .catch((err) => {
            // Handle error while refreshing access token
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }
    return Promise.reject(error);
  }
);

export default axios;
