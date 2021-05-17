import axiosInstance from "./axios";

export const getAllPeople = () => {
  return axiosInstance
    .get("people", {
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt-token")}` },
    })
    .then((r) => {
      return axiosInstance.get(`people?size=${r?.data}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
        },
      });
    });
};
export const deletePerson = (personId) => {
  return axiosInstance.delete(`people/${personId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("jwt-token")}` },
  });
};
export const getPerson = (personId) => {
  return axiosInstance.get(`people/${personId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("jwt-token")}` },
  });
};
export const createPerson = (data) => {
  return axiosInstance.post("people", data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("jwt-token")}` },
  });
};
export const updatePerson = (data) => {
  return axiosInstance.put("people/", data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("jwt-token")}` },
  });
};
