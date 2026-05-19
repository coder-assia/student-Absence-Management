import axios from "axios";

const API = "http://localhost:8082/etudiants";

export const getEtudiants = () => axios.get(API);

export const addEtudiant = (data) =>
  axios.post(API, data);

export const updateEtudiant = (id, data) =>
  axios.put(`${API}/${id}`, data);

export const deleteEtudiant = (id) =>
  axios.delete(`${API}/${id}`);