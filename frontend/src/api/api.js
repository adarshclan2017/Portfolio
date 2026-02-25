import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: `${BASE_URL}/api`,
});

export const authApi = () => {
  const token = localStorage.getItem("admin_token");

  return axios.create({
    baseURL: `${BASE_URL}/api`,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
};