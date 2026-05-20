import api from "./api";

export const getUsers = () => api.get("/users");

export const addUser = (data) => api.post("/users", data);

export const deleteUser = (id) => api.delete(`/users/${id}`);
