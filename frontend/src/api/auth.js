import axios from "axios";

export const loginRequest = (data) => {
  return axios.post("http://localhost:8082/auth/login", data);
};