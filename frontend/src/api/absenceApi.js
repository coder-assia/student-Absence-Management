import api from "./api";

const API_URL = "/absences";
const PUBLIC_API_URL = "http://localhost:8082/absences";

export const addAbsence = (data) => {
  return api.post(API_URL, data);
};

export const getAbsences = () => {
  return api.get(API_URL);
};

export const updateAbsence = (id, data) => {
  return api.put(`${API_URL}/${id}`, data);
};

export const deleteAbsence = (id) => {
  return api.delete(`${API_URL}/${id}`);
};

export const getJustificationUrl = (id) => {
  return `${PUBLIC_API_URL}/${id}/justification`;
};

export const downloadJustification = (id) => {
  return api.get(`${API_URL}/${id}/justification`, {
    responseType: "blob",
  });
};

export const justifyAbsence = (id, data) => {
  return api.post(`${API_URL}/${id}/justify`, data);
};

export const searchAbsences = (filters) => {

  return api.get(
    "/absences/search",
    {
      params: filters
    }
  );

};
