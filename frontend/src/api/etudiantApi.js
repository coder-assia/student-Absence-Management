import api from "./api";

const API = "/etudiants";

export const getEtudiants = () => api.get(API);

export const addEtudiant = (data) =>
  api.post(API, data);

export const updateEtudiant = (id, data) =>
  api.put(`${API}/${id}`, data);

export const deleteEtudiant = (id) =>
  api.delete(`${API}/${id}`);
