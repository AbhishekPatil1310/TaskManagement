import { api } from "./auth.api";

export const getNotifications = async () => {
  const res = await api.get("/notifications");
  return res.data;
};

export const getUnreadNotifications = async () => {
  const res = await api.get("/notifications/unread");
  return res.data;
};

export const markNotificationRead = async (id: string) => {
  await api.put(`/notifications/${id}/read`);
};
