import axios from "axios";
export const login = (data) => {
  return axios({
    method: "post",
    url: "http://localhost:8080/api/authenticate",
    data: data,
  });
};
