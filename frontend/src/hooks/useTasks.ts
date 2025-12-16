import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getDashboardTasks, updateTask } from "../api/task.api";
import type { Filters } from "../types"; // adjust imports to your actual types

export function useTasks(filters: Filters) {
  const queryClient = useQueryClient();

  // If Filters includes extra stuff, you can narrow it here to what the API expects
const tasksQuery = useQuery({
  queryKey: ["tasks", filters],
  queryFn: () => getDashboardTasks(filters),
});


const updateTaskMutation = useMutation({
  mutationFn: ({ id, data }: any) => updateTask(id, data),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["tasks"] });
  },
});


  return {
    ...tasksQuery,
    updateTask: updateTaskMutation.mutate,
  };
}
