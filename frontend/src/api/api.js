import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8082",
});

api.interceptors.request.use((config) => {
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");

  if (role) {
    config.headers["X-User-Role"] = role;
  }

  if (userId) {
    config.headers["X-User-Id"] = userId;
  }

  return config;
});

export default api;
