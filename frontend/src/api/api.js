import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const authApi = () => {
  const token = localStorage.getItem("admin_token");
  return axios.create({
    baseURL: "http://localhost:5000/api",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
};