import axios from "axios";

export const AxiosClient = axios.create({
  baseURL: "http://localhost:3001",
  validateStatus: (status) => true,
});
