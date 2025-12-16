import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask, updateTask } from "../api/task.api";
import type { TaskFormInput, UpdateTaskInput } from "../schemas/task.schema";

type MutationInput = {
  taskId?: string;
  data: TaskFormInput | UpdateTaskInput;
};

export function useTaskForm() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, data }: MutationInput) => {
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
