import axios from "axios";

const BASE_URL = "http://localhost:8082/auth";

export const loginRequest = (data) => {
  return axios.post(`${BASE_URL}/login`, data);
};

export const logout = () => {
  localStorage.removeItem("role");
  localStorage.removeItem("userId");
};