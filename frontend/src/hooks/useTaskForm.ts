import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask, updateTask } from "../api/task.api";
import type { TaskFormInput, UpdateTaskInput } from "../schemas/task.schema";

export function useTaskForm(taskId?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TaskFormInput | UpdateTaskInput) => {
      if (taskId) {
        return updateTask(taskId, data);
      }
      return createTask(data as TaskFormInput);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    }
  });
}