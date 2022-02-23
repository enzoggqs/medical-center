import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3333",
});

export const createSecretarySession = async (email, password) => {
  return api.post("/authenticate/secretary", { email, password });
};

export const getDoctors = async () => {
  return api.get("/secretary/doctors");
};
