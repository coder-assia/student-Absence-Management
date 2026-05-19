import axios from "axios";

const API_URL = "http://localhost:8082/absences";

export const addAbsence = (data) => {
  return axios.post(API_URL, data);
};

export const getAbsences = () => {
  return axios.get(API_URL);
};

export const updateAbsence = (id, data) => {
  return axios.put(`${API_URL}/${id}`, data);
};

export const deleteAbsence = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

export const getJustificationUrl = (id) => {
  return `${API_URL}/${id}/justification`;
};

export const searchAbsences = (filters) => {

  return axios.get(
    "http://localhost:8082/absences/search",
    {
      params: filters
    }
  );

};
