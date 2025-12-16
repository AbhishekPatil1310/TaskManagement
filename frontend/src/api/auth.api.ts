import axios from "axios";
const url = import.meta.env.VITE_BACKEND_URL 

export const api = axios.create({
  baseURL: url,
  withCredentials: true
});



export const login = async (data: {
  email: string;
  password: string;
}) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const register = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const logout = async () => {
  await api.post("/auth/logout");
};

export const me = async () => {
  const res = await api.get("/users/me");
  return res.data;
};

