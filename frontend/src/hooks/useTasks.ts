import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getDashboardTasks, updateTask } from "../api/task.api";
import type { Filters, Task } from "../types";

export function useTasks(filters: Filters) {
  const queryClient = useQueryClient();

  const tasksQuery = useQuery<Task[]>({
    queryKey: ["tasks", filters],
    queryFn: () => getDashboardTasks(filters),
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => 
      updateTask(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return {
    ...tasksQuery,
    updateTask: updateTaskMutation.mutate,
  };
}
