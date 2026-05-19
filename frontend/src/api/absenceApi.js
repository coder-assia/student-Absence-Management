import axios from "axios";

const API = "http://localhost:8082/absences";

export const getAbsences = () => axios.get(API);

export const addAbsence = (data) =>
  axios.post(API, data, {
    headers: {
      "Content-Type": "application/json"
    }
  });

export const updateAbsence = (id, data) =>
  axios.put(`${API}/${id}`, data, {
    headers: {
      "Content-Type": "application/json"
    }
  });

export const deleteAbsence = (id) =>
  axios.delete(`${API}/${id}`);