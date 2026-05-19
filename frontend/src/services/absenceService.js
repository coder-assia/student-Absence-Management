import api from "../api/api";

export const getAbsences = () => api.get("/absences");

export const createAbsence = (data) =>
  api.post("/absences", data);

export const deleteAbsence = (id) =>
  api.delete(`/absences/${id}`);