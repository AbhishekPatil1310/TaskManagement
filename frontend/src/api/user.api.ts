import { api } from "./auth.api";

export type UserOption = {
  id: string;
  name: string;
  email: string;
};

export const getUsers = async () => {
  const res = await api.get<UserOption[]>("/users");
  return res.data;
};

export const updateMe = async (data: { name: string }) => {
  const res = await api.put<UserOption>("/users/me", data);
  return res.data;
};