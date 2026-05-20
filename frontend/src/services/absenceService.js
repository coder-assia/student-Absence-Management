import api from "../api/api";

export const getAbsences = () => api.get("/absences");

export const createAbsence = (data) =>
  api.post("/absences", data);

export const deleteAbsence = (id) =>
  api.delete(`/absences/${id}`);

export const searchAbsences = async (filters) => {

  return api.get(
    "/absences/search",
    {
      params: filters,
    }
  );

};
