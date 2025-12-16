import { io } from "socket.io-client";
import { useAuthStore } from "../store/auth.store";

const user = useAuthStore.getState().user;

export const socket = io("http://localhost:5000", {
  withCredentials: true,
    auth: {
    userId: user?.id
  }
});
