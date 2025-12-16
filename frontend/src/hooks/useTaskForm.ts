import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask, updateTask } from "../api/task.api";
import type { TaskFormInput } from "../schemas/task.schema";

export function useTaskForm(taskId?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TaskFormInput) => {
      if (taskId) {
        return updateTask(taskId, data);
      }
      return createTask(data);
    },
    onSuccess: () => {
      // Invalidate dashboard tasks
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      // Invalidate single task if editing
      if (taskId) {
        queryClient.invalidateQueries({ queryKey: ["task", taskId] });
      }
    }
  });
}
