import axios from "axios";

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    if (error.response.status === 401) {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/accounts/auth/refresh`)
        .catch((err) => {
          console.log(err);
        });
    }
  }
);

export default axios;
