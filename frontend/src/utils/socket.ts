import { io } from "socket.io-client";
import { useAuthStore } from "../store/auth.store";

const user = useAuthStore.getState().user;

const url = import.meta.env.VITE_BACKEND_URL 

export const socket = io(url, {
  withCredentials: true,
    auth: {
    userId: user?.id
  }
});

