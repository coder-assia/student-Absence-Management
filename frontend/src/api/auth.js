import axios from "axios";

const BASE_URL = "http://localhost:8082/auth";

export const loginRequest = (data) => {
  return axios.post(`${BASE_URL}/login`, data);
};

export const signupRequest = (data) => {
  return axios.post(`${BASE_URL}/signup`, data);
};

export const logout = () => {
  localStorage.removeItem("role");
  localStorage.removeItem("userId");
  localStorage.removeItem("userName");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("matiere");
  localStorage.removeItem("filiere");
};
