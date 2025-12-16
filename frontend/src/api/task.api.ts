import { api } from "./auth.api";
import type{ Task } from "../types";
import type { TaskFormInput,UpdateTaskInput } from "../schemas/task.schema";


export const getDashboardTasks = async (params?: {
  view?: string;
  status?: string;
  priority?: string;
  sortBy?: "dueDate";
  order?: "asc" | "desc";
}) => {
  const res = await api.get<Task[]>("/tasks/dashboard", { params });
  return res.data;
};


export const updateTask = async (
  taskId: string,
  data: UpdateTaskInput
) => {
  const res = await api.put<Task>(`/tasks/${taskId}`, data);
  return res.data;
};

export const createTask = async (data: TaskFormInput) => {
  const res = await api.post<Task>("/tasks", data);
  return res.data;
};


export const getTaskById = async (id: string) => {
  const res = await api.get<Task>(`/tasks/${id}`);
  return res.data;

};
